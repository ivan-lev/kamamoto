// Проверка поисковых запросов. Запуск: mongosh ... ./test-queries.js
function q(c, idx, query, paths) {
  const should = paths.map(p => ({ text: { path: p, query } }));
  const r = db[c].aggregate([
    { $search: { index: idx, compound: { should } } },
    { $limit: 3 },
    { $project: { _id: 0, title: 1, name: 1, id: 1, score: { $meta: 'searchScore' } } },
  ]).toArray();
  print(c, '|', query, '=>', JSON.stringify(r));
}

const styleFields = ['title', 'title.ru', 'title.ja', 'name', 'description', 'description.ru', 'description.ja', 'article.content', 'article.content.ru', 'article.content.ja'];
const potterFields = ['name', 'name.ru', 'name.ja', 'id', 'japaneseName', 'info', 'info.ru', 'info.ja', 'article.content', 'article.content.ru', 'article.content.ja'];

q('styles', 'articles_search', 'Токонамэ', styleFields);
q('styles', 'articles_search', 'Tokoname', styleFields);
q('styles', 'articles_search', '常滑', styleFields);
q('styles', 'articles_search', '常滑焼', styleFields);
q('styles', 'articles_search', 'Bizen', styleFields);
q('styles', 'articles_search', '備前焼', styleFields);
q('potters', 'potters_search', 'Аракава Тоёдзо', potterFields);
q('potters', 'potters_search', 'Arakawa Toyozo', potterFields);
q('potters', 'potters_search', '荒川豊蔵', potterFields);
