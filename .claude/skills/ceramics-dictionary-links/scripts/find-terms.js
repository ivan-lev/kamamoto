// Ищет в опубликованных статьях первые упоминания терминов словаря и проверяет ссылки на /dictionary.
// Читает только локальный API, в базу ничего не пишет.
// Запуск из корня репозитория: node .claude/skills/ceramics-dictionary-links/scripts/find-terms.js
// Параметры — переменными окружения:
// ONLY=styles:karatsu,potters:kaneshige-toyo — только эти статьи (можно и черновики)
// TERMS=kohiki,tataki — только эти термины (id), например недавно добавленные в словарь
// API — адрес бэка, по умолчанию http://localhost:3000
// OUT_DIR — куда писать report.md и edits.json, по умолчанию temp/dictionary-links
const fs = require('fs');
const path = require('path');

const API = (process.env.API || 'http://localhost:3000').replace(/\/$/, '');
const OUT_DIR = process.env.OUT_DIR || 'temp/dictionary-links';
const ONLY = (process.env.ONLY || '').split(',').map(s => s.trim()).filter(Boolean);
const TERMS = new Set((process.env.TERMS || '').split(',').map(s => s.trim()).filter(Boolean));

// Русские слова в названиях терминов («камень Амакуса», «Глазурь исубай»): в тексте термин часто без них
const GENERIC_WORDS = Object.freeze(['камень', 'глазурь', 'глина']);
// Короткие транскрипции вне курсива дают слишком много ложных совпадений («ро», «сэй», «кама»)
const MIN_PLAIN_LENGTH = 5;

const CYR = 'а-яёА-ЯЁ';
const CJK = '゠-ヿ㐀-鿿豈-﫿々';
const ZERO_WIDTH = /[​-‍﻿]/g;

function escapeRegExp(s) {
	return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripTags(html) {
	return html.replace(/<[^>]*>/g, '');
}

async function getJson(url) {
	const res = await fetch(url);
	if (res.status === 404)
		return null;
	if (!res.ok)
		throw new Error(`${url}: ${res.status}`);
	return res.json();
}

// Окончания для падежных форм: японские слова на -а и на согласную в русском тексте склоняют
function caseEnding(form) {
	if (/а$/.test(form))
		return { stem: form.slice(0, -1), ending: '(?:а|ы|е|у|ой|ою|ам|ами|ах)' };
	if (/[бвгджзклмнпрстфхцчшщ]$/.test(form))
		return { stem: form, ending: '(?:а|у|ом|е|ы|ов|ам|ами|ах)?' };
	return { stem: form, ending: '' };
}

function readingRegExp(form) {
	const { stem, ending } = caseEnding(form);
	// Дефис и пробел внутри термина взаимозаменяемы: «какэ-вакэ», «какэ вакэ», «какэвакэ»
	const body = stem.split(/[-\s]+/).map(escapeRegExp).join('[-\\s]?');
	return new RegExp(`(?<![${CYR}-])${body}${ending}(?![${CYR}-])`, 'giu');
}

function kanjiRegExp(form) {
	// Хирагана после иероглифов допустима (花入れ), иероглиф или катакана — уже другое слово
	return new RegExp(`(?<![${CJK}])${escapeRegExp(form)}(?![${CJK}])`, 'gu');
}

function buildTerm(term) {
	const clean = s => (s || '').replace(ZERO_WIDTH, '').trim();
	const titles = clean(term.title).toLowerCase().split(/\s*(?:\bили\b|,)\s*/u).filter(Boolean);
	const readings = new Set();
	for (const title of titles) {
		readings.add(title);
		const words = title.split(/\s+/);
		if (words.length > 1 && GENERIC_WORDS.includes(words[0]))
			readings.add(words.slice(1).join(' '));
	}
	const kanji = clean(term.kanji)
		.split(/\s*(?:\bили\b|,|、|\/|;|\(|\))\s*/u)
		.map(s => s.replace(/реже/u, '').trim())
		.filter(s => s && new RegExp(`[${CJK}]`, 'u').test(s));
	return {
		id: term.id,
		title: clean(term.title),
		kanjiText: clean(term.kanji),
		readings: [...readings],
		kanji,
		readingRes: [...readings].map(form => ({ form, re: readingRegExp(form) })),
		kanjiRes: kanji.map(form => ({ form, re: kanjiRegExp(form) })),
	};
}

// Разбирает HTML блока на текстовые узлы с их окружением: курсив, ссылка, заголовок.
// Список источников (после заголовка «Источники» или «Список источников», без учёта регистра) не сканируется
function scanBlock(content) {
	const nodes = [];
	const links = [];
	const stack = { i: null, a: null, h: null };
	const token = /<[^>]*>|[^<]+/g;
	let m;
	let headingText = '';
	while ((m = token.exec(content))) {
		const raw = m[0];
		const start = m.index;
		const end = start + raw.length;
		if (raw[0] !== '<') {
			if (stack.h)
				headingText += raw;
			nodes.push({ text: raw, start, italic: stack.i, link: stack.a, heading: Boolean(stack.h) });
			continue;
		}
		const tag = raw.match(/^<\/?([a-z0-9]+)/i)?.[1]?.toLowerCase();
		const closing = raw[1] === '/';
		if (tag === 'i' || tag === 'em') {
			if (closing && stack.i) {
				stack.i.end = end;
				stack.i = null;
			}
			else if (!closing) {
				stack.i = { start, end: null };
			}
		}
		else if (tag === 'a') {
			if (closing && stack.a) {
				stack.a.end = end;
				links.push(stack.a);
				stack.a = null;
			}
			else if (!closing) {
				const href = raw.match(/href="([^"]*)"/)?.[1] ?? '';
				const dictionaryId = href.match(/\/dictionary#([\w-]+)/)?.[1] ?? null;
				stack.a = { start, end: null, href, dictionaryId, italicOutside: stack.i };
			}
		}
		else if (tag === 'h2' || tag === 'h3') {
			if (closing) {
				stack.h = null;
				if (/^\s*(?:источники|список\s+источников)/iu.test(headingText))
					break;
				headingText = '';
			}
			else {
				stack.h = { start };
			}
		}
	}
	return { nodes, links };
}

// Курсив справа или слева от иероглифов: «(化粧土, <i>кэсёдо</i>)» или «<i>татаки</i> (叩き)»
function adjacentItalic(content, start, end) {
	const after = content.slice(end).match(/^\s*(?:,|\s[-—–])\s*(?:<a [^>]*>)?(<i>[^<]*<\/i>)/);
	if (after) {
		const offset = end + after[0].length - after[1].length;
		return { start: offset, end: offset + after[1].length };
	}
	const before = content.slice(0, start).match(/(<i>[^<]*<\/i>)(?:<\/a>)?\s*\(\s*$/);
	if (before)
		return { start: before.index, end: before.index + before[1].length };
	return null;
}

// Чтение без курсива рядом с иероглифами: «Гома (胡麻)», «(土味 - цути адзи)»
function adjacentPlain(content, start, end) {
	const before = content.slice(0, start).match(/(?<![а-яё-])([а-яё][а-яё-]*)\s*\(\s*$/iu);
	if (before)
		return { start: before.index, end: before.index + before[1].length };
	const after = content.slice(end).match(/^\s*(?:,|\s[-—–])\s*([а-яё][а-яё -]*[а-яё])\s*\)/iu);
	if (after) {
		const offset = end + after[0].indexOf(after[1]);
		return { start: offset, end: offset + after[1].length };
	}
	return null;
}

function findMentions(term, blocks) {
	const mentions = [];
	blocks.forEach(({ content, scan }, block) => {
		for (const link of scan.links) {
			if (link.dictionaryId === term.id)
				mentions.push({ block, pos: link.start, kind: 'link', link });
		}
		for (const node of scan.nodes) {
			// Заголовки и текст внешних ссылок не считаются упоминанием
			if (node.heading || (node.link && node.link.dictionaryId === null))
				continue;
			for (const { re } of term.readingRes) {
				re.lastIndex = 0;
				let m;
				while ((m = re.exec(node.text))) {
					const start = node.start + m.index;
					const end = start + m[0].length;
					if (node.italic)
						mentions.push({ block, pos: node.italic.start, kind: 'italic', start, end, node });
					else if (m[0].length >= MIN_PLAIN_LENGTH || node.link)
						mentions.push({ block, pos: start, kind: 'plain', start, end, node });
				}
			}
			for (const { re } of term.kanjiRes) {
				re.lastIndex = 0;
				let m;
				while ((m = re.exec(node.text))) {
					const start = node.start + m.index;
					const end = start + m[0].length;
					const reading = adjacentItalic(content, start, end);
					const plainReading = reading ? null : adjacentPlain(content, start, end);
					const near = reading ?? plainReading;
					const readingLink = near && scan.links.find(l => l.start <= near.start && l.end >= near.end);
					mentions.push({ block, pos: near ? near.start : start, kind: 'kanji', start, end, reading, plainReading, readingLink, node });
				}
			}
		}
	});
	mentions.sort((a, b) => a.block - b.block || a.pos - b.pos);
	return mentions;
}

// Расширяет фрагмент контекстом, пока он не станет единственным в блоке
function uniqueEdit(content, start, end, replacement) {
	let from = start;
	let to = end;
	for (let i = 0; i < 40; i++) {
		const old = content.slice(from, to);
		if (content.indexOf(old) === content.lastIndexOf(old))
			return { old, new: content.slice(from, start) + replacement + content.slice(end, to) };
		if (i % 2 === 0 && from > 0)
			from = Math.max(0, from - 8);
		else if (to < content.length)
			to = Math.min(content.length, to + 8);
	}
	return null;
}

function contextOf(content, start, end) {
	const before = stripTags(content.slice(Math.max(0, start - 200), start)).slice(-70);
	const middle = stripTags(content.slice(start, end));
	const after = stripTags(content.slice(end, end + 200)).slice(0, 70);
	return `…${before}⟦${middle}⟧${after}…`.replace(/\s+/g, ' ');
}

function dictionaryHref(id) {
	return `/dictionary#${id}`;
}

// Решение по первому упоминанию термина
function analyzeTerm(term, blocks) {
	const mentions = findMentions(term, blocks);
	if (!mentions.length)
		return [];
	const findings = [];
	const first = mentions[0];
	const { content } = blocks[first.block];
	const termLinks = mentions.filter(m => m.kind === 'link');
	const base = { termId: term.id, termTitle: term.title, block: first.block };

	const firstLink = first.kind === 'link' ? first.link : (first.readingLink ?? first.node?.link);
	if (firstLink && firstLink.dictionaryId === term.id) {
		const linkHtml = content.slice(firstLink.start, firstLink.end);
		if (firstLink.italicOutside && firstLink.italicOutside.end !== null) {
			const it = firstLink.italicOutside;
			const html = content.slice(it.start, it.end);
			const m = html.match(/^<i>(<a [^>]*>)([^<]*)<\/a><\/i>$/);
			findings.push({
				...base,
				kind: 'italic-outside',
				note: 'курсив снаружи ссылки',
				context: contextOf(content, it.start, it.end),
				edit: m ? uniqueEdit(content, it.start, it.end, `${m[1]}<i>${m[2]}</i></a>`) : null,
			});
		}
		else if (!/<i>/.test(linkHtml)) {
			const m = linkHtml.match(/^(<a [^>]*>)([^<]*)<\/a>$/);
			const isReading = m && term.readingRes.some(({ re }) => {
				re.lastIndex = 0;
				const found = re.exec(m[2]);
				return found && found[0] === m[2].trim();
			});
			if (isReading) {
				findings.push({
					...base,
					kind: 'link-no-italic',
					note: 'транскрипция в ссылке без курсива — проверь, что это не русское слово',
					context: contextOf(content, firstLink.start, firstLink.end),
					edit: uniqueEdit(content, firstLink.start, firstLink.end, `${m[1]}<i>${m[2]}</i></a>`),
				});
			}
		}
	}
	else if (firstLink && firstLink.dictionaryId) {
		findings.push({
			...base,
			kind: 'wrong-link',
			note: `первое упоминание ведёт на #${firstLink.dictionaryId}`,
			context: contextOf(content, firstLink.start, firstLink.end),
			edit: null,
		});
	}
	else {
		const later = termLinks[0];
		let target = null;
		let note = '';
		if (first.kind === 'italic' || (first.kind === 'kanji' && first.reading)) {
			const it = first.kind === 'italic' ? first.node.italic : first.reading;
			const html = content.slice(it.start, it.end);
			const text = stripTags(html).trim();
			const full = first.kind === 'kanji' || term.readingRes.some(({ re }) => {
				re.lastIndex = 0;
				const found = re.exec(text);
				return found && found[0].toLowerCase() === text.toLowerCase();
			});
			target = { start: it.start, end: it.end, replacement: `<a href="${dictionaryHref(term.id)}">${html}</a>` };
			if (first.kind === 'kanji')
				note = 'ссылка на чтение рядом с иероглифами — проверь, что чтение относится к этому термину';
			else if (!full)
				note = 'термин — часть более длинного курсива, ссылка охватит его целиком';
		}
		else if (first.kind === 'plain') {
			const word = content.slice(first.start, first.end);
			target = { start: first.start, end: first.end, replacement: `<a href="${dictionaryHref(term.id)}"><i>${word}</i></a>` };
			note = 'транскрипция без курсива — проверь, что это термин, а не имя, топоним или название стиля';
		}
		else if (first.kind === 'kanji' && first.plainReading) {
			const { start, end } = first.plainReading;
			const word = content.slice(start, end);
			target = { start, end, replacement: `<a href="${dictionaryHref(term.id)}"><i>${word}</i></a>` };
			note = 'слово рядом с иероглифами без курсива — проверь, что это чтение термина, а не русское слово';
		}
		else {
			note = 'иероглифы без чтения рядом — ссылку ставить вручную';
		}

		const auto = Boolean(target) && !note && !later;
		findings.push({
			...base,
			kind: later ? 'move' : (auto ? 'wrap' : 'manual'),
			note: later
				? `ссылка уже стоит ниже (блок ${later.block + 1}) — перенести на первое упоминание${note ? `; ${note}` : ''}`
				: note,
			context: contextOf(content, target?.start ?? first.start, target?.end ?? first.end),
			edit: target ? uniqueEdit(content, target.start, target.end, target.replacement) : null,
			auto,
		});
		if (later) {
			const laterContent = blocks[later.block].content;
			const linkHtml = laterContent.slice(later.link.start, later.link.end);
			const inner = linkHtml.replace(/^<a [^>]*>/, '').replace(/<\/a>$/, '');
			findings.push({
				termId: term.id,
				termTitle: term.title,
				block: later.block,
				kind: 'unlink',
				note: 'снять ссылку ниже, если она перенесена на первое упоминание',
				context: contextOf(laterContent, later.link.start, later.link.end),
				edit: uniqueEdit(laterContent, later.link.start, later.link.end, inner),
			});
		}
	}

	// Ссылка на словарь ставится один раз на статью
	for (const extra of termLinks.slice(1)) {
		const extraContent = blocks[extra.block].content;
		const linkHtml = extraContent.slice(extra.link.start, extra.link.end);
		findings.push({
			termId: term.id,
			termTitle: term.title,
			block: extra.block,
			kind: 'duplicate',
			note: 'повторная ссылка на тот же термин',
			context: contextOf(extraContent, extra.link.start, extra.link.end),
			edit: uniqueEdit(extraContent, extra.link.start, extra.link.end, linkHtml.replace(/^<a [^>]*>/, '').replace(/<\/a>$/, '')),
		});
	}
	return findings;
}

async function loadArticles() {
	const list = [];
	if (ONLY.length) {
		for (const item of ONLY) {
			const [collection, key] = item.split(':');
			list.push({ collection, key });
		}
	}
	else {
		for (const s of await getJson(`${API}/api/ceramic-styles/articles`) ?? [])
			list.push({ collection: 'styles', key: s.name });
		for (const p of await getJson(`${API}/api/potters/lnt`) ?? [])
			list.push({ collection: 'potters', key: p.link.split('/').pop() });
		// Раздел приёмов может быть ещё не подключён — тогда 404
		for (const f of await getJson(`${API}/api/features/features`).catch(() => null) ?? [])
			list.push({ collection: 'features', key: f.name });
	}

	const urls = {
		styles: [key => `${API}/api/ceramic-styles/${key}`, `${API}/api/ceramic-styles/`, 'name'],
		potters: [key => `${API}/api/potters/${key}`, `${API}/api/potters/`, 'id'],
		features: [key => `${API}/api/features/${key}`, `${API}/api/features/`, 'name'],
	};
	const articles = [];
	for (const { collection, key } of list) {
		if (!urls[collection])
			throw new Error(`неизвестная коллекция ${collection}, нужна styles | potters | features`);
		const [one, all, keyField] = urls[collection];
		// Черновик по адресу статьи отдаёт 404 — ищем в общем списке
		let doc = await getJson(one(key));
		if (!doc)
			doc = (await getJson(all) ?? []).find(d => d[keyField] === key);
		if (!doc?.article?.length) {
			console.warn(`пропущено ${collection}:${key} — нет статьи`);
			continue;
		}
		articles.push({ collection, key, title: doc.title || doc.name || key, article: doc.article });
	}
	return articles;
}

// Несостыковки в самом словаре мешают сопоставлению — о них стоит сказать пользователю
function dictionaryIssues(rawTerms, terms) {
	const issues = [];
	const byKanji = new Map();
	for (const t of terms) {
		for (const k of t.kanji)
			byKanji.set(k, [...(byKanji.get(k) ?? []), t.id]);
	}
	for (const [k, ids] of byKanji) {
		if (ids.length > 1)
			issues.push(`одинаковые иероглифы ${k} у терминов ${ids.join(', ')}`);
	}
	for (const t of rawTerms) {
		if (/[\u200B-\u200D\uFEFF]/.test(`${t.title}${t.kanji}`))
			issues.push(`невидимые символы (zero-width) в названии или иероглифах термина ${t.id}`);
	}
	return issues;
}

async function main() {
	const sections = await getJson(`${API}/api/terms/`).catch((error) => {
		console.error(`ОШИБКА: локальный бэк не отвечает (${error.message}) — нужен npm run dev`);
		process.exit(1);
	});
	const rawTerms = sections.flatMap(section => section.terms);
	const allTerms = rawTerms.map(buildTerm);
	const knownIds = new Set(allTerms.map(t => t.id));
	const terms = TERMS.size ? allTerms.filter(t => TERMS.has(t.id)) : allTerms;
	for (const id of TERMS) {
		if (!knownIds.has(id))
			console.warn(`термина ${id} нет в словаре`);
	}

	const articles = await loadArticles();
	const report = [];
	const edits = [];
	let n = 0;

	for (const art of articles) {
		const blocks = art.article.map(b => ({ content: b.content, scan: scanBlock(b.content) }));
		const findings = terms.flatMap(term => analyzeTerm(term, blocks));

		// Ссылки на несуществующие термины
		blocks.forEach(({ content, scan }, block) => {
			for (const link of scan.links) {
				if (link.dictionaryId && !knownIds.has(link.dictionaryId)) {
					findings.push({
						termId: link.dictionaryId,
						termTitle: '—',
						block,
						kind: 'broken',
						note: 'такого термина в словаре нет',
						context: contextOf(content, link.start, link.end),
						edit: null,
					});
				}
			}
		});

		findings.sort((a, b) => a.block - b.block || a.context.localeCompare(b.context));
		report.push(`## ${art.title} (${art.collection}:${art.key})`, '');
		if (!findings.length) {
			report.push('Всё в порядке.', '');
			continue;
		}
		report.push('| № | Термин | Что | Блок | Контекст | Замена |', '| --- | --- | --- | --- | --- | --- |');
		for (const f of findings) {
			n++;
			const edit = f.edit ? `\`${f.edit.old}\` → \`${f.edit.new}\`` : '—';
			const what = f.note ? `${f.kind}: ${f.note}` : f.kind;
			report.push(`| ${n} | ${f.termTitle} (${f.termId}) | ${what} | ${f.block + 1} | ${f.context.replace(/\|/g, '\\|')} | ${edit.replace(/\|/g, '\\|')} |`);
			if (f.edit) {
				edits.push({
					n,
					auto: Boolean(f.auto) || f.kind === 'italic-outside',
					kind: f.kind,
					collection: art.collection,
					key: art.key,
					termId: f.termId,
					block: f.block,
					old: f.edit.old,
					new: f.edit.new,
				});
			}
		}
		report.push('');
	}

	const issues = dictionaryIssues(rawTerms, allTerms);
	if (issues.length)
		report.push('## Несостыковки в словаре', '', ...issues.map(i => `- ${i}`), '');

	fs.mkdirSync(OUT_DIR, { recursive: true });
	fs.writeFileSync(path.join(OUT_DIR, 'report.md'), `${report.join('\n')}\n`);
	fs.writeFileSync(path.join(OUT_DIR, 'edits.json'), `${JSON.stringify(edits, null, '\t')}\n`);

	const count = kind => edits.filter(e => e.kind === kind).length;
	console.log(`Статей: ${articles.length}, терминов: ${terms.length}, находок: ${n}`);
	console.log(`Черновик правок: ${edits.length} (автоматических: ${edits.filter(e => e.auto).length}; wrap ${count('wrap')}, manual ${count('manual')}, move ${count('move')}, italic ${count('italic-outside') + count('link-no-italic')}, duplicate ${count('duplicate')})`);
	console.log(`Отчёт: ${path.join(OUT_DIR, 'report.md')}`);
	console.log(`Правки: ${path.join(OUT_DIR, 'edits.json')}`);
}

main().catch((error) => {
	console.error(`ОШИБКА: ${error.message}`);
	process.exit(1);
});
