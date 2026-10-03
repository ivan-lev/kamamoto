# Окружение, деплой, инфраструктура

**Всё в этом файле, кроме локального `npm run dev`, выполняет только пользователь.** Claude не запускает эти команды без явной просьбы.

## Переменные окружения (корневой `.env`, не в git)

Значения не читать и не выводить. Список имён:

| Группа | Переменные | Кто использует |
|---|---|---|
| ssh | `DEPLOY_USER`, `DEPLOY_HOST`, `DEPLOY_PORT`, `DEPLOY_PATH` | `upload:*`, `db:*` |
| front | `VITE_MAP_API_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` | Vite (форма контактов, карта) |
| back | `BASE_URL`, `PORT`, `STATIC_URL`, `JWT_SECRET`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS` | `back/src/config.ts` |
| mongo | `MONGO_INITDB_ROOT_USERNAME`, `MONGO_INITDB_ROOT_PASSWORD` | контейнер mongo |

`front/.env` (в репозитории): только `VITE_BASE_API_DEV_URL`.
Если переменной в `back/src/config.ts` нет, подставляется заглушка вида `'CHECK_JWT_SECRET'`. Так что пропущенная переменная не роняет приложение, а даёт странное поведение.

## Прод (VPS, docker compose)

| Сервис | Что делает |
|---|---|
| `front` | собирает `dist` и копирует его в volume `front_build`, после чего завершается (`restart: no`). Build-arg — только `VITE_MAP_API_KEY` |
| `back` | `node dist/app.js` на :3000, env из `.env`, `NODE_ENV=production`, `DB_HOST=mongo`, `./static` смонтирован в `/static`, volume `front_build` — в `/srv/front` (read-only, оттуда берётся `index.html` для страниц сайта) |
| `mongo` | `mongo:8.x` с `--auth`, данные в `./mongo/db_dump`, порт доступен только на `127.0.0.1:27017` |
| `caddy` | HTTPS, `kamamoto.ru`: `/api/*` и `/static/*` проксируются в back:3000, `/yuding/*` — SPA yuding, существующие файлы из `/srv/front` отдаёт сам, остальные пути сайта (`@spaRoute`) проксирует в back:3000, который возвращает `index.html` с мета-тегами страницы |
| `yuding` | побочный проект, собирается так же, как front |

Страницы сайта зависят от бэка: если `back` лежит, не открывается ничего, кроме главной. При выкатке изменений в `controllers/pages.ts` вместе с `Caddyfile` сначала обновлять и перезапускать `back`, потом `caddy`: иначе Caddy проксирует страницы в бэк без нужного роута, и вместо сайта будет «Cannot GET». Пока идёт `./ops.sh front`, volume `front_build` на пару секунд пустеет, и страницы сайта в это время отвечают 500.

Caddy также отвечает за канонические URL (301): убирает хвостовой слэш у `/<...>/<число>/` и у страниц из списка `@staticToRemoveSlash`, добавляет его у списков из `@listingToAddSlash`. Статике выставлен кэш `max-age=31536000, immutable`, поэтому файлы с тем же именем не обновятся у пользователей — отсюда правило «не перезаписывать файлы, а давать новое имя».

`ops.sh <up|down|prune|all|front|back|caddy|mongo|yuding>` — управление docker compose на VPS: пересборка и перезапуск сервисов, чистка диска (до 2026-10-01 скрипт назывался `restart.sh`).

Обновление образа (`mongo`, `caddy`): сначала `docker compose pull <service>`, и только когда образ скачан — бэкап и `./ops.sh <service>`. Скрипт сначала останавливает и удаляет контейнер, поэтому если образ не скачается, сервис останется лежать.
- С VPS `docker pull` из Docker Hub может падать с `TLS handshake timeout` (2026-09-27, mongo 8.3.11), хотя `registry-1.docker.io`, `auth.docker.io` и `production.cloudflare.docker.com` отвечают. Обход без перезапуска Docker: `docker pull mirror.gcr.io/library/<image>:<tag> && docker tag mirror.gcr.io/library/<image>:<tag> <image>:<tag>`.
- **Mongo: перед сменой major/minor-версии проверить FCV** (`db.adminCommand({ getParameter: 1, featureCompatibilityVersion: 1 })`). Новый mongod стартует только на данных с FCV предыдущей версии. Иначе контейнер уходит в `Restarting (62)` с `UPGRADE PROBLEM: Found an invalid featureCompatibilityVersion document`, а сайт ложится. 2026-10-03: прод на 8.3.11 с FCV `8.2`, а 9.0 принимает только `8.0`, `8.3` или `9.0`. Порядок: на старой версии `setFeatureCompatibilityVersion: "<текущая>", confirm: true` → смена образа → после обкатки `setFeatureCompatibilityVersion: "<новая>", confirm: true`. Откатить образ можно только при FCV старой версии: если FCV уже поднят, сначала опустить его на новой версии. Неудачный старт данные не портит, после возврата старого образа всё поднимается.
- Если любой GET отдаёт `{"message":"На сервере произошла ошибка, которую не идентифицировали :("}`, а в `docker compose logs back` видно `MongoServerSelectionError ... mongo:27017`, значит Mongo лежит. Дальше смотреть `docker compose ps -a mongo` и `docker compose logs mongo`. Бэк переподключается сам каждые 5 с, перезапускать его не нужно.
- Диск VPS заканчивается (2026-10-01: Mongo в `Restarting (100)`, `No space left on device` на `mongod.lock`). Место съедают пересборки с `--no-cache`: старые образы и кэш сборки. Безопасная очистка — `./ops.sh prune`: он удаляет остановленные контейнеры, неиспользуемые сети, образы без тега и кэш сборки, а до и после показывает `df -h`. Старые теги `mongo`/`caddy` он не трогает (`image prune` без `-a`, чтобы после `down` не пришлось заново скачивать образы). Их удалять вручную через `docker rmi`. Логи ротируются: у контейнеров в `docker-compose.yml` (`x-logging`, 3×10 МБ), у winston в бэке (`variables/logs.ts`, тоже 3×10 МБ). Ещё место занимают бэкапы `mongo/backups/backup-*.gz`, они копятся с каждым `db:push`. **Нельзя** `docker volume prune` и `system prune --volumes`: удалятся сертификаты в `caddy_data` и сборка фронта.
- Бэкап БД на VPS: `DB_NAME=... bash mongo/dump.sh > mongo/backups/<name>.gz` из папки с compose. Архив `--archive --gzip` не проверяется через `gunzip -t`: смотреть на строки `done dumping` и размер.

## Деплой (из корня, rsync по ssh)

| Скрипт | Что уходит на сервер |
|---|---|
| `upload:front` / `upload:back` / `upload:yuding` | соответствующая папка, с `--delete` |
| `upload:static` | `static/` (без `--delete`) |
| `upload:config` | `.env`, `Caddyfile`, `docker-compose.yml`, `ops.sh` + `mongo/` |
| `upload:all` | весь репозиторий |

Исключения — в `rsync-rules.txt`: `node_modules`, `dist`, `.git`, `*.md`, `docs`, `logs`, `db_dump`, `backups` и т.д. После загрузки на VPS запускается `./ops.sh <service>`.

## Синхронизация БД (`mongo/`)

- `npm run db:pull` — делает бэкап локальной БД в `mongo/backups/local-backup-<stamp>.gz`, затем **заменяет** локальную БД прод-данными.
- `npm run db:push` — делает бэкап прод-БД на VPS в `mongo/backups/backup-<stamp>.gz`, затем **заменяет** прод-БД локальной.
- `dump.sh` / `restore.sh` — вспомогательные скрипты, выполняются на VPS через `docker compose exec`, креды берутся из env контейнера.

Судя по скриптам, контент правится в локальной админке и уходит на прод через `db:push` + `upload:static` (*предположение, не подтверждено пользователем*). **Поэтому локальная БД — это не песочница.** Тестовые записи, созданные при отладке, нужно удалять, иначе они окажутся на проде.

## CI / зависимости

- GitHub Actions: `ci-front`, `ci-back`, `ci-docs`, `ci-yuding` на PR в `main`. Они только запускают `npm ci && npm run build` в нужной папке (`_build.yml`, Node 24). Линтера и тестов в CI нет.
- Renovate (self-hosted workflow, по пятницам): minor/patch мёржатся автоматически, major — нет.
  - Automerge срабатывает, только если по PR прошёл хотя бы один CI. CI запускается по путям `back/**`, `front/**`, `docs/**`, `yuding/**`, плюс общий `_build.yml` и свой `ci-*.yml` (правка `_build.yml` прогоняет сборку всех четырёх проектов). Под `docker-compose.yml` и `renovate.yml` CI нет, поэтому для них в `renovate.json` стоит `ignoreTests: true` (с 2026-10-03): их minor/patch вливаются без проверок. Слияние в `main` на прод само не выкатывается.
  - Сломанная сборка любого проекта блокирует все PR, которые его затрагивают. CI собирает с чистого checkout, так что незакоммиченный файл, на который ссылается закоммиченный код, ломает CI, хотя локально всё собирается.
  - Лимиты на число PR сняты (`prHourlyLimit`/`prConcurrentLimit: 0`): при запуске раз в неделю дефолтные 2 PR/час давали очередь из ~20 обновлений. `repositories` задаётся через env `RENOVATE_REPOSITORIES` в workflow, а не в `renovate.json`.
- Для ручного обновления зависимостей есть скилл `.claude/skills/update-deps` (`/update-deps`).
