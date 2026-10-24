// Вносит в статьи локальной базы правки ссылок на словарь из edits.json (его готовит find-terms.js).
// Запуск через mongosh --file, параметры — переменными окружения:
// EDITS_FILE — путь к edits.json: [{ n, collection, key, block, old, new }], block — индекс с 0
// ONLY_N=1,3,5-8 — внести только эти пункты (номера из отчёта); без него — все пункты файла
// DRY_RUN=1 — только показать, что будет записано
const fs = require('fs');

// У гончаров ключ — строковый id, у стилей и приёмов — name
const KEY_FIELDS = Object.freeze({ styles: 'name', potters: 'id', features: 'name' });

const { EDITS_FILE, ONLY_N, DRY_RUN } = process.env;

function fail(message) {
	print(`ОШИБКА: ${message}`);
	quit(1);
}

function stripTags(html) {
	return html.replace(/<[^>]*>/g, '');
}

function parseNumbers(list) {
	const numbers = new Set();
	for (const part of list.split(',').map(s => s.trim()).filter(Boolean)) {
		const [from, to] = part.split(/[-–]/).map(Number);
		for (let i = from; i <= (to || from); i++)
			numbers.add(i);
	}
	return numbers;
}

if (!EDITS_FILE || !fs.existsSync(EDITS_FILE))
	fail(`нет файла EDITS_FILE: ${EDITS_FILE}`);

let edits = JSON.parse(fs.readFileSync(EDITS_FILE, 'utf8'));
if (ONLY_N) {
	const numbers = parseNumbers(ONLY_N);
	edits = edits.filter(e => numbers.has(e.n));
}
if (!edits.length)
	fail('нет правок для записи');

for (const e of edits) {
	if (!KEY_FIELDS[e.collection])
		fail(`пункт ${e.n}: неизвестная коллекция ${e.collection}`);
	// Скрипт только расставляет разметку: текст статьи меняться не должен
	if (stripTags(e.old) !== stripTags(e.new))
		fail(`пункт ${e.n}: правка меняет текст, а не только разметку`);
}

const groups = new Map();
for (const e of edits) {
	const id = `${e.collection}:${e.key}`;
	groups.set(id, [...(groups.get(id) ?? []), e]);
}

let failed = 0;
for (const [id, group] of groups) {
	const { collection: collName, key } = group[0];
	const keyField = KEY_FIELDS[collName];
	const collection = db.getCollection(collName);
	const doc = collection.findOne({ [keyField]: key }, { article: 1 });
	print(`\n== ${id}`);
	if (!doc?.article?.length) {
		print(`  ПРОПУЩЕНО: нет записи или статьи`);
		failed++;
		continue;
	}

	const existing = doc.article;
	// Слайды и остальные поля блока не трогаем — меняется только content
	const newArticle = existing.map(block => ({ ...block }));
	let ok = true;
	for (const e of group) {
		const block = newArticle[e.block];
		if (!block) {
			print(`  ${e.n}. нет блока ${e.block + 1}`);
			ok = false;
			continue;
		}
		const count = block.content.split(e.old).length - 1;
		if (count !== 1) {
			print(`  ${e.n}. фрагмент встречается в блоке ${e.block + 1} ${count} раз (нужно ровно 1): ${e.old}`);
			ok = false;
			continue;
		}
		const at = block.content.indexOf(e.old);
		const before = stripTags(block.content.slice(Math.max(0, at - 120), at)).replace(/\s+/g, ' ').slice(-40);
		const after = stripTags(block.content.slice(at + e.old.length, at + e.old.length + 120)).replace(/\s+/g, ' ').slice(0, 40);
		block.content = block.content.replace(e.old, () => e.new);
		print(`  ${e.n}. блок ${e.block + 1}: …${before}`);
		print(`     - ${e.old}`);
		print(`     + ${e.new}`);
		print(`     …${after}`);
	}

	if (!ok) {
		print('  ПРОПУЩЕНО: статья не изменена, перезапусти find-terms.js — текст мог поменяться');
		failed++;
		continue;
	}
	if (DRY_RUN) {
		print(`  DRY_RUN: ${group.length} правок не записано`);
		continue;
	}
	// Статья должна остаться такой, какой её прочитали: её могли править в админке параллельно
	const result = collection.updateOne({ _id: doc._id, article: existing }, { $set: { article: newArticle } });
	if (result.matchedCount === 0) {
		print('  ПРОПУЩЕНО: статью изменили во время записи, ничего не записано');
		failed++;
		continue;
	}
	print(`  Записано правок: ${group.length}`);
}

print(`\nСтатей: ${groups.size}, пропущено: ${failed}${DRY_RUN ? ' (DRY_RUN)' : ''}`);
if (failed)
	quit(1);
