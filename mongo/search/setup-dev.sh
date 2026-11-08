#!/usr/bin/env bash
# Первичная настройка локальной среды с MongoDB Search.
# Использование: bash mongo/search/setup-dev.sh
# Выполняет: rs.initiate, создание mongotUser (searchCoordinator), restore данных из дампа.
set -euo pipefail

cd "$(dirname "$0")"

COMPOSE_FILE="docker-compose.yml"
MONGO_CONTAINER="kamamoto-mongo-dev"
DB_NAME="${DB_NAME:-kamamotodb}"
ROOT_USER="${MONGO_INITDB_ROOT_USERNAME:-admin}"

if [ ! -f mongot-password ]; then
  # пароль mongot-пользователя; для локальной разработки генерируем один раз
  openssl rand -hex 16 > mongot-password
  echo "Сгенерирован mongot-password"
fi
MONGOT_PASSWORD="$(cat mongot-password)"

echo "==> Запуск контейнеров"
docker compose -f "$COMPOSE_FILE" up -d

echo "==> Ожидание готовности mongo"
until docker exec "$MONGO_CONTAINER" mongosh --quiet -u "$ROOT_USER" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin --eval "db.adminCommand('ping').ok" >/dev/null 2>&1; do
  sleep 2
done

echo "==> Инициализация replica set (если ещё не инициализирован)"
docker exec "$MONGO_CONTAINER" mongosh --quiet -u "$ROOT_USER" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin --eval "
try { rs.status().ok } catch (e) {
  rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: 'mongo:27017' }] });
}
"
sleep 3

echo "==> Создание пользователя mongotUser (searchCoordinator)"
docker exec "$MONGO_CONTAINER" mongosh --quiet -u "$ROOT_USER" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin --eval "
try { db.getSiblingDB('admin').createUser({ user: 'mongotUser', pwd: '$MONGOT_PASSWORD', roles: [{ role: 'searchCoordinator', db: 'admin' }] }) } catch (e) { print(e.codeName) }
"

echo "==> Restore данных из дампа (если указан)"
DUMP_DIR="${1:-}"
if [ -n "$DUMP_DIR" ] && [ -d "$DUMP_DIR" ]; then
  docker exec -i "$MONGO_CONTAINER" mongorestore --quiet -u "$ROOT_USER" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin --archive < <(mongodump --quiet -u "$ROOT_USER" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin -d "$DB_NAME" --archive --host 127.0.0.1:27017 2>/dev/null) 2>/dev/null || \
  echo "(!) Авто-restore не удался, выполните вручную: mongorestore -u $ROOT_USER -p ... --authenticationDatabase admin --drop $DUMP_DIR"
else
  echo "    Дамп не указан. Пример: bash setup-dev.sh ../backups/local-2026-11-08"
fi

echo "==> Проверка health mongot"
docker exec "$MONGO_CONTAINER" mongosh --quiet -u "$ROOT_USER" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin --eval "
const r = db.adminCommand({ getParameter: 1, mongotHost: 1 });
print('mongotHost:', JSON.stringify(r.mongotHost));
"

echo "Готово. MongoDB доступен на 127.0.0.1:27017 (replica set rs0), mongot во внутренней сети search-dev."
