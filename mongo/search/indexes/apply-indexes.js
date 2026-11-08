// Создание/обновление поисковых индексов MongoDB Search.
// Запуск локально: bash apply-indexes.sh
// Запуск на VPS: bash rebuild.sh (из корня проекта) — сам скопирует файлы в контейнер
const fs = require('node:fs');

const collections = {
  styles: 'articles_search',
  potters: 'potters_search',
  terms: 'terms_search',
};

for (const [coll, name] of Object.entries(collections)) {
  const definition = JSON.parse(fs.readFileSync(`./${name}.json`, 'utf8'));
  const existing = db[coll].getSearchIndexes(name);
  if (existing.length > 0) {
    print(`Обновление индекса ${name} на ${coll}`);
    db[coll].updateSearchIndex(name, definition);
  }
  else {
    print(`Создание индекса ${name} на ${coll}`);
    db[coll].createSearchIndexes([{ name, definition }]);
  }
}

// после db:push (restore с --drop) collection id меняются — форсируем пересборку,
// иначе mongot может ждать изменений по устаревшему курсору
print('OK');
