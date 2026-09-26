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
| `back` | `node dist/app.js` на :3000, env из `.env`, `NODE_ENV=production`, `DB_HOST=mongo`, `./static` смонтирован в `/static` |
| `mongo` | `mongo:8.x` с `--auth`, данные в `./mongo/db_dump`, порт доступен только на `127.0.0.1:27017` |
| `caddy` | HTTPS, `kamamoto.ru`: `/api/*` и `/static/*` проксируются в back:3000, `/yuding/*` — SPA yuding, остальное — SPA front (`try_files ... /index.html`) |
| `yuding` | побочный проект, собирается так же, как front |

Caddy также отвечает за канонические URL (301): убирает хвостовой слэш у `/<...>/<число>/` и у страниц из списка `@staticToRemoveSlash`, добавляет его у списков из `@listingToAddSlash`. Статике выставлен кэш `max-age=31536000, immutable`, поэтому файлы с тем же именем не обновятся у пользователей — отсюда правило «не перезаписывать файлы, а давать новое имя».

`restart.sh <up|down|prune|all|front|back|caddy|mongo|yuding>` — пересборка и перезапуск сервисов на VPS.

## Деплой (из корня, rsync по ssh)

| Скрипт | Что уходит на сервер |
|---|---|
| `upload:front` / `upload:back` / `upload:yuding` | соответствующая папка, с `--delete` |
| `upload:static` | `static/` (без `--delete`) |
| `upload:config` | `.env`, `Caddyfile`, `docker-compose.yml` + `mongo/` |
| `upload:all` | весь репозиторий |

Исключения — в `rsync-rules.txt`: `node_modules`, `dist`, `.git`, `*.md`, `docs`, `logs`, `db_dump`, `backups` и т.д. После загрузки на VPS запускается `./restart.sh <service>`.

## Синхронизация БД (`mongo/`)

- `npm run db:pull` — делает бэкап локальной БД в `mongo/backups/local-backup-<stamp>.gz`, затем **заменяет** локальную БД прод-данными.
- `npm run db:push` — делает бэкап прод-БД на VPS в `mongo/backups/backup-<stamp>.gz`, затем **заменяет** прод-БД локальной.
- `dump.sh` / `restore.sh` — вспомогательные скрипты, выполняются на VPS через `docker compose exec`, креды берутся из env контейнера.

Судя по скриптам, контент правится в локальной админке и уходит на прод через `db:push` + `upload:static` (*предположение, не подтверждено пользователем*). **Поэтому локальная БД — это не песочница.** Тестовые записи, созданные при отладке, нужно удалять, иначе они окажутся на проде.

## CI / зависимости

- GitHub Actions: `ci-front`, `ci-back`, `ci-docs`, `ci-yuding` на PR в `main`. Они только запускают `npm ci && npm run build` в нужной папке (`_build.yml`, Node 24). Линтера и тестов в CI нет.
- Renovate (self-hosted workflow, по пятницам): minor/patch мёржатся автоматически, major — нет.
  - Automerge срабатывает, только если по PR прошёл хотя бы один CI. CI запускается по путям `back/**`, `front/**`, `docs/**`, `yuding/**`, поэтому PR, которые трогают только `docker-compose.yml` или workflow, вливаются вручную.
  - Сломанная сборка любого проекта блокирует все PR, которые его затрагивают. CI собирает с чистого checkout, так что незакоммиченный файл, на который ссылается закоммиченный код, ломает CI, хотя локально всё собирается.
  - Лимиты на число PR сняты (`prHourlyLimit`/`prConcurrentLimit: 0`): при запуске раз в неделю дефолтные 2 PR/час давали очередь из ~20 обновлений. `repositories` задаётся через env `RENOVATE_REPOSITORIES` в workflow, а не в `renovate.json`.
- Для ручного обновления зависимостей есть скилл `.claude/skills/update-deps` (`/update-deps`).
