// Жёсткая пересборка поисковых индексов: drop + create.
// Используется на VPS после db:push: restore с --drop создаёт коллекции заново,
// и mongot может не подхватить это по change stream. Запуск: см. rebuild.sh
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
    print(`Drop индекса ${name} на ${coll}`);
    db[coll].dropSearchIndex(name);
  }
}

// drop асинхронный: даём mongot секунду, чтобы удалить старый индекс
sleep(1000);

for (const [coll, name] of Object.entries(collections)) {
  const definition = JSON.parse(fs.readFileSync(`./${name}.json`, 'utf8'));
  print(`Создание индекса ${name} на ${coll}`);
  db[coll].createSearchIndexes([{ name, definition }]);
}
