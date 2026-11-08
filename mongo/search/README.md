# MongoDB Search (mongot) — настройка и эксплуатация

Поиск по статьям kamamoto.ru работает на **MongoDB Search в self-managed режиме**: отдельный процесс `mongot` (образ `mongodb/mongodb-community-search`) синхронизирует данные из MongoDB и обслуживает полнотекстовые запросы через aggregation-этап `$search`.

Официальная документация: https://www.mongodb.com/docs/search/self-managed/current/

## 1. Требования к версиям

| Компонент | Версия | Примечание |
|---|---|---|
| MongoDB Server | **8.3+** (используется 9.0.4) | mongot не поддерживает версии ниже 8.3 |
| mongot | **1.70.6** | Community Edition, образ `mongodb/mongodb-community-search:1.70.6` |
| Топология | **replica set** (однодолевой достаточно) | standalone НЕ поддерживается |
| Роль mongot | `searchCoordinator` (MongoDB 8.2+) | пользователь `mongotUser` в БД `admin` |

Важно: официальные Homebrew-сборки mongod для macOS скомпилированы **без gRPC**, поэтому связка «нативный macOS mongod + mongot» невозможна. Локально mongod тоже запускается в Docker.

## 2. Схема взаимодействия

```
back (Express) ──aggregate $search──> mongo (mongod, rs0, --auth)
                                          │  gRPC :27028 (внутренняя сеть)
                                          ▼
                                       mongot (community-search)
                                          │  SCRAM mongotUser / admin
                                          └──репликация данных из mongo
```

- `mongod` получает адрес mongot через `setParameter: mongotHost` и `searchIndexManagementHostAndPort`.
- `mongot` подключается к mongod по SCRAM (пользователь `mongotUser`, роль `searchCoordinator`).
- Приложение подключается к MongoDB с `directConnection=true` (имя члена RS `mongo:27017` не резолвится с хоста macOS).

## 3. Локальная разработка

Файлы: `mongo/search/` (только локальная среда, НЕ production).

```bash
# первичная настройка (rs.initiate + mongotUser + запуск контейнеров)
cd <корень проекта> && set -a && source .env && set +a
bash mongo/search/setup-dev.sh

# restore данных из дампа (пример)
mongorestore -u admin -p "$DB_PASS" --authenticationDatabase admin --host 127.0.0.1:27017 --drop mongo/backups/local-2026-11-08

# создание/обновление поисковых индексов
cd mongo/search/indexes && DB_PASS=$DB_PASS bash apply-indexes.sh

# проверка запросов из ТЗ
mongosh ... ./test-queries.js
```

После этого `npm run dev` работает как обычно: MongoDB слушает `127.0.0.1:27017` (docker), креды и БД — из `.env`.

Служебные файлы (генерируются один раз, не коммитятся): `mongo/search/keyfile`, `mongo/search/mongot-password` (chmod 600 — mongot падает при более широких правах).

## 4. Индексы

Три индекса (определения — `mongo/search/indexes/*.json`):

| Коллекция | Индекс | Поля |
|---|---|---|
| `styles` | `articles_search` | `title`, `name`, `description`, `article.content` |
| `potters` | `potters_search` | `name`, `japaneseName`, `id`, `info`, `article.content` |
| `terms` | `terms_search` | `title`, `kanji`, `romaji`, `id`, `definition` |

Анализаторы: базовый `lucene.standard` + multi-поля `.ru` (`lucene.russian`, лемматизация) и `.ja` (`lucene.japanese` — kuromoji: разбиение текста без пробелов на токены, кандзи/хирагана/катакана). HTML в `description`/`info`/`article.content` индексируется как есть (теги дают незначительный шум), сниппеты API отдаёт уже очищенными от тегов. Веса полей задаются на уровне запроса (`score: { boost: { value: N } }`): заголовок 10 → имена/slug 6–8 → описание 4–5 → содержимое 2. Индекс-time `score.boost` этой версией mongot не поддерживается.

Не индексируются: `_id`, `slides` (фото), `thumbnail`/`photo`/`image`/`mapImage`, `lifeDates`, `letter`, служебные флаги.

Обновление: правите `*.json` → `apply-indexes.sh` (делает `updateSearchIndex`, если индекс существует). Статус: `db.<coll>.getSearchIndexes()` → `READY`.

## 5. API

`GET /api/search?q=<строка>&limit=<1..50>` (по умолчанию 20). Ответ:

```json
{ "items": [ { "title": "...", "link": "/ceramic-styles/tokoname", "snippet": "...", "thumbnail": "..." } ], "query": "..." }
```

- 400 — ошибки валидации (celebrate); 503 «Поиск временно недоступен» — недоступен mongot/индекс; 200 с пустым `items` — нет результатов.
- Публичный (GET проходит мимо JWT-авторизации). Фильтр публикации: `styles.showArticle: true`, `potters.showArticle: true, isLNT: true`; `terms` — вся коллекция.
- Единый список по убыванию `searchScore`, без пагинации.

## 6. Миграция production (НЕ выполнялась — требует согласования)

1. Бэкап: `bash mongo/dump.sh` на сервере.
2. В `docker-compose.yml` для `mongo`: добавить в `command` `--replSet rs0`, `--keyFile /etc/mongo/keyfile` и setParameter-ы как в `mongo/search/docker-compose.yml`; примонтировать keyfile (chmod 600). Данные в `./mongo/db_dump` не переносятся и не удаляются.
3. Добавить сервис `mongot`: сеть `app-net`, без публикации портов, volume `mongot_data`, политика `x-logging`, `depends_on: mongo`.
4. Однократно: `docker exec mongo mongosh ... --eval 'rs.initiate({_id:"rs0",members:[{_id:0,host:"mongo:27017"}]})'`.
5. Создать `mongotUser` (searchCoordinator) и `mongot-password` (600).
6. Применить индексы `apply-indexes.js` к прод-БД.
7. Рестарт `back`; проверка `curl 'https://kamamoto.ru/api/search?q=Tokoname'`.

Откат: убрать `--replSet`/setParameter из command и удалить сервис mongot; данные MongoDB не затрагиваются.

## 7. Восстановление после потери volume mongot

Потеря `mongot_data` не затрагивает данные MongoDB (индекс mongot — производное). Восстановление: перезапустить mongot — он выполнит initial sync и пересоберёт индексы автоматически. Проверка целостности MongoDB: `mongosh ... --eval 'db.styles.countDocuments()'` → 58, `db.potters` → 41, `db.terms` → 205 (сверить с дампом).

## 8. Диагностика

- health mongot (изнутри сети): `curl <mongot>:8080/health` → `SERVING`;
- `docker logs kamamoto-mongot-dev` — синхронизация/аутентификация;
- `db.<coll>.getSearchIndexes()` — статус индексов;
- 503 от API = mongot недоступен;
- 500 `buffering timed out` = приложение не подключено к БД (`directConnection=true`).

## 9. Известные ограничения

- Скоры разных коллекций не полностью сопоставимы — межколлекционное ранжирование приблизительное.
- Русская лемматизация есть, исправления опечаток и синонимов нет.
- HTML индексируется с тегами (альтернатива — чистые текстовые поля, требует миграции данных).

