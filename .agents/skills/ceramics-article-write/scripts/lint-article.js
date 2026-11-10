#!/usr/bin/env node
// Линтер типографики и разметки черновика статьи (articles.md, «Типографика» и «Разметка»).
// Проверяет только то, что видно по самому тексту; факты и транскрипцию не проверяет.
// Запуск из корня репозитория:
//   node .agents/skills/ceramics-article-write/scripts/lint-article.js "$PWD/temp/articles/<ключ>/article.html"

'use strict';

const file = process.argv[2] || process.env.FILE;
if (!file) {
  console.error('Укажи файл: lint-article.js <путь к article.html>');
  process.exit(2);
}

const fs = require('fs');
let raw;
try {
  raw = fs.readFileSync(file, 'utf8');
} catch (e) {
  console.error(`Не читается файл ${file}: ${e.message}`);
  process.exit(2);
}

const findings = [];
const add = (line, kind, msg) => findings.push({ line, kind, msg });

// Текст без тегов и комментариев — для проверок типографики.
const lines = raw.split('\n');
const textOf = (s) => s.replace(/<!--.*?-->/g, '').replace(/<[^>]*>/g, '');

lines.forEach((rawLine, i) => {
  const n = i + 1;
  const t = textOf(rawLine);

  // --- Типографика (текст без тегов) ---
  if (/["]/.test(t)) add(n, 'кавычки', 'прямая кавычка " — нужны «ёлочки» или „лапки“');
  if (/\d—\d/.test(t)) add(n, 'тире', 'между числами «—» — нужно «–» без пробелов (1592–1598)');
  if (/(^|\s)-(\s|$)/.test(t)) add(n, 'тире', 'дефис с пробелами — в предложении тире «—», дефис только внутри слов');
  if (/\.\./.test(t)) add(n, 'точки', 'двойная точка');
  // градусы: образец «1300 °C» — пробел перед °, без пробела после, латинская C
  const deg = t.match(/\d\s*°\s*[CСc]/g);
  if (deg) for (const d of deg) {
    if (!/^\d °C$/.test(d)) add(n, 'градусы', `«${d}» — нужно «1300 °C»: пробел перед °, без пробела после, латинская C`);
  }
  // невидимые символы
  const invisible = rawLine.match(/[\u200B\u200C\u200D\uFEFF]/g);
  if (invisible) add(n, 'невидимые символы', `найдено ${invisible.length} шт. (zero-width/BOM) — удалить`);
  const nbsp = rawLine.match(/(\u00A0\u00A0|&nbsp;&nbsp;)/);
  if (nbsp) add(n, 'пробелы', 'двойной неразрывный пробел');

  // --- Разметка (сырая строка) ---
  if (/<em[\s>]/.test(rawLine)) add(n, 'разметка', '<em> — пиши сразу <i>, редактор заменит');
  const forbidden = rawLine.match(/<(h1|h4|h5|h6|span|div|table|code|pre)[\s>]/g);
  if (forbidden) add(n, 'разметка', `${forbidden.join(', ')} — редактор выбросит`);
  const saved = rawLine.match(/<(u|s|br|hr)[\s>/]/g);
  if (saved) add(n, 'разметка (в новый текст не добавлять)', `${saved.join(', ')} — допустимо только в существующем тексте`);
  if (/<i>\s*<a\s/.test(rawLine)) add(n, 'ссылки', 'курсив снаружи ссылки — правильно <a …><i>…</i></a>');
  if (/<p>\s*<\/p>/.test(rawLine)) add(n, 'разметка', 'пустой абзац <p></p>');
  // атрибуты: style/target/rel и классы не на img
  const tags = rawLine.match(/<[a-zA-Z][^>]*/g) || [];
  for (const tag of tags) {
    const name = tag.slice(1).match(/^[a-zA-Z0-9]+/)[0].toLowerCase();
    if (name !== 'img' && /\sclass\s*=/.test(tag)) add(n, 'разметка', `class на <${name}> — редактор не сохранит`);
    if (/\s(style|target|rel)\s*=/.test(tag)) add(n, 'разметка', `атрибут ${tag.match(/\s(style|target|rel)\s*=/)[1]} на <${name}> — редактор не сохранит`);
  }
  // ссылки
  const hrefs = rawLine.match(/href="[^"]*"/g) || [];
  for (const href of hrefs) {
    const url = href.slice(6, -1);
    if (/utm_/.test(url)) add(n, 'ссылки', `utm-метки в ${url} — убрать`);
    if (/(google\.|yandex\.|bing\.|duckduckgo)/.test(url) || /[?&]q=|\/search\?/.test(url)) add(n, 'ссылки', `ссылка на поисковую выдачу: ${url}`);
  }
  const imgs = rawLine.match(/<img[^>]*>/g) || [];
  for (const img of imgs) {
    const src = (img.match(/src="([^"]*)"/) || [])[1] || '';
    if (src && !src.startsWith('/static/')) add(n, 'картинки', `src="${src}" — не из /static/, картинка может пропасть`);
  }
});

// --- Структура файла ---
const firstContent = lines.findIndex((l) => l.trim() !== '');
if (firstContent === -1) add(1, 'структура', 'файл пустой');
else if (lines[firstContent].trim() !== '<!-- block -->') add(firstContent + 1, 'структура', 'первая содержательная строка — не разделитель <!-- block -->');
if (!lines.some((l) => l.trim() === '<!-- block -->')) add(1, 'структура', 'нет ни одного разделителя <!-- block -->');

// Заголовок списка источников — предупредить о вариантах, которые сайт не узнает.
const lastBlock = raw.lastIndexOf('<!-- block -->');
if (lastBlock !== -1) {
  const tail = raw.slice(lastBlock);
  if (/<h[23][^>]*>(Источники|Список источников)/i.test(tail) === false && /Источники/.test(tail)) {
    const h = tail.match(/<h([1-6])[^>]*>[^<]*[Ии]сточник[^<]*</);
    if (h) add(0, 'структура', `заголовок источников <h${h[1]}> — сайт узнаёт только h2/h3 «Источники:»`);
  }
  if (/<(Литература|Ссылки)/.test(tail) || />(Литература|Ссылки)</.test(tail)) add(0, 'структура', 'заголовок «Литература»/«Ссылки» — сайт выведет список обычным столбиком, нужен «Источники:»');
}

if (!findings.length) {
  console.log('OK: типографика и разметка чистые');
  process.exit(0);
}
for (const f of findings) console.log(`${f.line > 0 ? `строка ${f.line}` : 'файл'}: [${f.kind}] ${f.msg}`);
console.log(`\nВсего: ${findings.length}`);
process.exit(1);
