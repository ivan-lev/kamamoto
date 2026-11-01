// Записывает статью из article.html в поле article записи локальной базы.
// Запуск через mongosh --file, параметры — переменными окружения:
// ARTICLE_FILE — путь к html с блоками, разделёнными <!-- block -->
// COLLECTION — styles | potters | features, KEY — значение ключа записи
// AFTER=<n> — вставить блоки после n-го блока готовой статьи (0 — в начало);
//             без AFTER статья записывается целиком, только если её ещё нет
// DRY_RUN=1 — только показать, что будет записано
const fs = require('fs');

// У гончаров ключ — строковый id, у стилей и приёмов — name
const KEY_FIELDS = Object.freeze({ styles: 'name', potters: 'id', features: 'name' });

const { ARTICLE_FILE, COLLECTION, KEY, AFTER, DRY_RUN } = process.env;
const keyField = KEY_FIELDS[COLLECTION];
const isInsert = AFTER !== undefined && AFTER !== '';

function fail(message) {
	print(`ОШИБКА: ${message}`);
	quit(1);
}

if (!keyField)
	fail(`COLLECTION должна быть одной из: ${Object.keys(KEY_FIELDS).join(', ')}`);
if (!KEY)
	fail('не задан KEY');
if (!ARTICLE_FILE || !fs.existsSync(ARTICLE_FILE))
	fail(`нет файла ARTICLE_FILE: ${ARTICLE_FILE}`);

const article = fs.readFileSync(ARTICLE_FILE, 'utf8')
	.split(/<!--\s*block\s*-->/)
	.map(content => content.trim())
	.filter(Boolean)
	.map(content => ({ content, slides: [] }));

if (article.length === 0)
	fail('в файле нет блоков');

const collection = db.getCollection(COLLECTION);
const doc = collection.findOne({ [keyField]: KEY }, { article: 1, showArticle: 1 });

if (!doc)
	fail(`в ${COLLECTION} нет записи с ${keyField}: '${KEY}' — её нужно создать в админке`);

const existing = doc.article ?? [];
let newArticle = article;
let filter;

if (isInsert) {
	const after = Number(AFTER);
	if (!existing.length)
		fail('у записи ещё нет статьи — запусти без AFTER');
	if (!Number.isInteger(after) || after < 0 || after > existing.length)
		fail(`AFTER должен быть от 0 до ${existing.length}`);
	newArticle = [...existing.slice(0, after), ...article, ...existing.slice(after)];
	// Статья должна остаться такой, какой её прочитали: её могли править в админке параллельно
	filter = { _id: doc._id, article: existing };
}
else {
	// Готовую статью не перезаписываем: её могли править вручную
	if (existing.length)
		fail(`у записи уже есть статья (${existing.length} бл.), запись отменена; новый раздел вставляется через AFTER`);
	filter = doc.article
		? { _id: doc._id, article: { $size: 0 } }
		: { _id: doc._id, article: { $exists: false } };
}

const newBlocks = new Set(article);
newArticle.forEach((block, i) => {
	const heading = block.content.match(/<h[23]>(.*?)<\/h[23]>/)?.[1] ?? '(без заголовка)';
	const mark = isInsert && newBlocks.has(block) ? ' [новый]' : '';
	print(`${i + 1}. ${heading} — ${block.content.length} симв.${mark}`);
});
print(`showArticle: ${doc.showArticle ?? false} (не меняется)`);

if (DRY_RUN) {
	print('DRY_RUN: ничего не записано');
	quit(0);
}

const result = collection.updateOne(filter, { $set: { article: newArticle } });

if (result.matchedCount === 0)
	fail('статью изменили во время записи, ничего не записано');
print(`Записано новых блоков: ${article.length}, всего в статье: ${newArticle.length}`);
