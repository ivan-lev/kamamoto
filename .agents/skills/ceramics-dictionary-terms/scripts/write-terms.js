// Добавление и правка терминов словаря в локальной базе (коллекция terms).
// Запуск из корня репозитория через mongosh (значения .env не выводятся):
//   DRY_RUN=1 TERMS_FILE="$PWD/temp/dictionary-terms/terms.json" \
//     node_modules/.bin/dotenv -e .env -- bash -c 'mongosh --quiet --host "$DB_HOST" --port "$DB_PORT" -u "$DB_USER" -p "$DB_PASS" --authenticationDatabase admin "$DB_NAME" --file .claude/skills/ceramics-dictionary-terms/scripts/write-terms.js'
//
// Формат TERMS_FILE — массив:
//   { "action": "insert", "term": { id, title, kanji, romaji, definition, letter } }
//   { "action": "update", "id": "<id>", "set": { поле: новое значение }, "expect": { поле: текущее значение } }
// В update меняются только поля из set; expect — текущие значения этих полей: если термин
// успели изменить в админке, запись пропускается. id и image не меняются никогда.
//
// Ошибки (ERROR) останавливают запись целиком. Предупреждения (WARN) запись не останавливают,
// но их нужно разобрать: возможный дубль, буква не совпадает с названием, типографика.

const fs = require('fs');

const file = process.env.TERMS_FILE;
const dryRun = Boolean(process.env.DRY_RUN);
const audit = Boolean(process.env.AUDIT);
if (!file && !audit) {
	print('Нужна переменная TERMS_FILE (или AUDIT=1 для проверки всего словаря)');
	quit(1);
}

const entries = audit ? [] : JSON.parse(fs.readFileSync(file, 'utf8'));
const existing = db.terms.find({}, { _id: 0 }).toArray();
const byId = new Map(existing.map(t => [t.id, t]));

const FIELDS = ['id', 'title', 'kanji', 'romaji', 'definition', 'letter'];
const EDITABLE = ['title', 'kanji', 'romaji', 'definition', 'letter'];
const INVISIBLE = /[​-‍﻿ ]/;

const errors = [];
const warns = [];

// Латиница без дефисов и пробелов, долгие гласные свёрнуты: himo-zukuri → himozukuri, tougei → togei.
function norm(s) {
	return s.toLowerCase()
		.replace(/[-\s']/g, '')
		.replace(/ou/g, 'o')
		.replace(/uu/g, 'u')
		.replace(/oo/g, 'o');
}

// Варианты написания термина: id, слова romaji и пары соседних слов («kake hanaire» → kakehanaire).
function latinKeys(term) {
	const tokens = (term.romaji || '').split(/[\s,]+/).filter(Boolean);
	const keys = new Set([norm(term.id || '')]);
	tokens.forEach((t, i) => {
		keys.add(norm(t));
		if (tokens[i + 1])
			keys.add(norm(t + tokens[i + 1]));
	});
	return keys;
}

// Дубль по латинице — только если id каждого из двух терминов есть среди вариантов другого:
// так «hanaire» не считается дублем «kake-hanaire», а «himozukuri» и «himo-zukuri» считаются.
function latinMatch(a, b) {
	return latinKeys(b).has(norm(a.id || '')) && latinKeys(a).has(norm(b.id || ''));
}

function titleKeys(term) {
	return new Set((term.title || '').toLowerCase()
		.split(/\s+или\s+|,\s*/)
		.map(s => s.replace(/^(камень|глазурь)\s+/, '').replace(/[-\s]/g, '').replace(/ё/g, 'е'))
		.filter(Boolean));
}

function kanjiVariants(term) {
	return (term.kanji || '')
		.replace(INVISIBLE, '')
		.split(/\s+или\s+|[,、]\s*|\s*\(.*?\)/)
		.map(s => s.trim())
		.filter(Boolean);
}

// Остов из иероглифов: 紐作り → 紐作, 紐づくり → 紐. Совпадение остова — повод посмотреть глазами.
function kanjiSkeleton(s) {
	return s.replace(/[぀-ゟ]/g, '');
}

function intersects(a, b) {
	for (const x of a) {
		if (b.has(x))
			return true;
	}
	return false;
}

function findDuplicates(term, pool) {
	const found = [];
	const tk = titleKeys(term);
	const kv = kanjiVariants(term);
	for (const other of pool) {
		if (other.id === term.id)
			continue;
		const reasons = [];
		const okv = kanjiVariants(other);
		if (kv.some(k => okv.includes(k)))
			reasons.push('иероглифы');
		else if (kv.some(k => okv.some(o => kanjiSkeleton(o) && kanjiSkeleton(o) === kanjiSkeleton(k))))
			reasons.push('иероглифы без каны');
		if (latinMatch(term, other))
			reasons.push('ромадзи');
		if (intersects(tk, titleKeys(other)))
			reasons.push('название');
		if (reasons.length)
			found.push(`${other.id} («${other.title}», ${other.kanji}) — совпадают: ${reasons.join(', ')}`);
	}
	return found;
}

function checkText(where, term) {
	const d = term.definition;
	if (d === undefined)
		return;
	if (/^[А-ЯЁA-Z]/.test(d))
		warns.push(`${where}: определение начинается с заглавной буквы`);
	if (/"/.test(d.replace(/<[^>]+>/g, '')))
		warns.push(`${where}: прямые кавычки — нужны «ёлочки»`);
	if (/ - /.test(d))
		warns.push(`${where}: дефис вместо тире «—»`);
	if (/ {2}/.test(d))
		warns.push(`${where}: двойной пробел`);
	if (/<(?!\/?(?:i|a|strong)\b)[^>]+>/.test(d))
		warns.push(`${where}: в определении теги кроме <i>, <a>, <strong>`);
	if (/<i>\s*<a /.test(d))
		errors.push(`${where}: курсив снаружи ссылки — нужно <a href="/dictionary#id"><i>…</i></a>`);
	for (const field of FIELDS) {
		if (typeof term[field] === 'string' && INVISIBLE.test(term[field]))
			errors.push(`${where}: невидимый символ в поле ${field}`);
	}
}

const batchIds = new Set(entries.filter(e => e.action === 'insert').map(e => e.term && e.term.id));

function checkLinks(where, definition) {
	for (const m of (definition || '').matchAll(/href="\/dictionary#([^"]+)"/g)) {
		if (!byId.has(m[1]) && !batchIds.has(m[1]))
			errors.push(`${where}: ссылка на несуществующий термин ${m[1]}`);
	}
}

function checkLetter(where, term) {
	const letter = term.letter;
	if (!/^[а-яё]$/.test(letter || '')) {
		errors.push(`${where}: letter должна быть одной строчной русской буквой`);
		return;
	}
	const first = (term.title || '').trim()[0];
	if (first && first.toLowerCase() !== letter)
		warns.push(`${where}: letter «${letter}», а название начинается с «${first}» — верно, только если название начинается с русского слова («камень Амакуса» → «а»)`);
}

// AUDIT=1: весь словарь — возможные дубли, битые ссылки, оформление. Ничего не пишет.
if (audit) {
	const seen = new Set();
	for (const t of existing) {
		const where = `${t.id}`;
		checkText(where, t);
		checkLinks(where, t.definition);
		for (const d of findDuplicates(t, existing)) {
			const pair = [t.id, d.split(' ')[0]].sort().join('|');
			if (!seen.has(pair)) {
				seen.add(pair);
				warns.push(`${where}: возможный дубль ${d}`);
			}
		}
	}
	// В аудите невидимые символы и курсив снаружи ссылки — тоже находки, а не стоп-сигнал.
	for (const m of [...warns, ...errors]) print(`- ${m}`);
	print(`\nТерминов: ${existing.length}; находок: ${warns.length + errors.length}.`);
	quit(0);
}

const plan = [];

entries.forEach((entry, i) => {
	const n = `#${i + 1}`;
	if (entry.action === 'insert') {
		const t = entry.term || {};
		const where = `${n} insert ${t.id}`;
		for (const f of ['id', 'title', 'definition', 'letter']) {
			if (!t[f])
				errors.push(`${where}: пустое поле ${f}`);
		}
		for (const f of Object.keys(t)) {
			if (!FIELDS.includes(f))
				errors.push(`${where}: лишнее поле ${f} (image не задаётся — фото добавляет пользователь)`);
		}
		if (!/^[a-z0-9-]+$/.test(t.id || ''))
			errors.push(`${where}: id должен состоять из [a-z0-9-]`);
		if (byId.has(t.id))
			errors.push(`${where}: термин с таким id уже есть`);
		if (entries.filter(e => e.action === 'insert' && e.term && e.term.id === t.id).length > 1)
			errors.push(`${where}: id повторяется в файле`);
		checkLetter(where, t);
		checkText(where, t);
		checkLinks(where, t.definition);
		const pool = [...existing, ...entries.filter((e, j) => j !== i && e.action === 'insert').map(e => e.term)];
		for (const d of findDuplicates(t, pool))
			warns.push(`${where}: возможный дубль ${d}`);
		plan.push({ kind: 'insert', doc: { id: t.id, title: t.title, kanji: t.kanji || '', romaji: t.romaji || '', image: '', definition: t.definition, letter: t.letter } });
	}
	else if (entry.action === 'update') {
		const where = `${n} update ${entry.id}`;
		const cur = byId.get(entry.id);
		const set = entry.set || {};
		const expect = entry.expect || {};
		if (!cur) {
			errors.push(`${where}: термина нет в базе`);
			return;
		}
		const keys = Object.keys(set);
		if (!keys.length)
			errors.push(`${where}: пустой set`);
		for (const f of keys) {
			if (!EDITABLE.includes(f))
				errors.push(`${where}: поле ${f} не меняется (id — на него ссылаются статьи, image — фото пользователя)`);
			if (!(f in expect))
				errors.push(`${where}: нет текущего значения поля ${f} в expect`);
			else if (expect[f] !== cur[f])
				errors.push(`${where}: поле ${f} в базе уже не такое, как в expect — перечитай термин`);
		}
		const next = { ...cur, ...set };
		if ('letter' in set || 'title' in set)
			checkLetter(where, next);
		checkText(where, set);
		checkLinks(where, set.definition);
		if ('kanji' in set || 'romaji' in set || 'title' in set) {
			for (const d of findDuplicates(next, existing))
				warns.push(`${where}: возможный дубль ${d}`);
		}
		plan.push({ kind: 'update', id: entry.id, set, expect });
	}
	else {
		errors.push(`${n}: action должен быть insert или update`);
	}
});

for (const w of warns) print(`WARN  ${w}`);
for (const e of errors) print(`ERROR ${e}`);

if (errors.length) {
	print(`\nОшибок: ${errors.length}. Ничего не записано.`);
	quit(1);
}

print(`\nК записи: ${plan.filter(p => p.kind === 'insert').length} новых, ${plan.filter(p => p.kind === 'update').length} правок; предупреждений: ${warns.length}.`);
if (dryRun) {
	print('DRY_RUN: ничего не записано.');
	quit(0);
}

let inserted = 0;
let updated = 0;
for (const p of plan) {
	if (p.kind === 'insert') {
		db.terms.insertOne(p.doc);
		inserted++;
	}
	else {
		const r = db.terms.updateOne({ id: p.id, ...p.expect }, { $set: p.set });
		if (r.matchedCount === 0)
			print(`SKIP  ${p.id}: термин изменили параллельно, правка не внесена`);
		else
			updated++;
	}
}
print(`Записано: ${inserted} новых, ${updated} правок. Всего терминов: ${db.terms.countDocuments()}.`);
