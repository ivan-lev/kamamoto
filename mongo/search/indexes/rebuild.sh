#!/usr/bin/env bash
# Пересборка поисковых индексов на VPS (внутри контейнера mongo) + ожидание READY.
# Запуск из корня проекта на VPS: bash mongo/search/indexes/rebuild.sh
# После db:push (restore с --drop) collection id меняются, mongot может не подхватить
# изменения по change stream — поэтому пересоздаём индексы и ждём готовности.
set -euo pipefail
cd "$(dirname "$0")/../../.." # корень проекта: mongo/search/indexes -> корень

: "${MONGO_INITDB_ROOT_USERNAME:?set MONGO_INITDB_ROOT_USERNAME}"
: "${MONGO_INITDB_ROOT_PASSWORD:?set MONGO_INITDB_ROOT_PASSWORD}"

MONGOSH_ARGS=(-u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin --quiet)

# жёсткая пересборка: drop + create, чтобы не зависеть от состояния change streams
echo "==> Пересоздание поисковых индексов"
for f in mongo/search/indexes/*.json; do
  docker cp "$f" mongo:/tmp/ >/dev/null
done
docker cp mongo/search/indexes/drop-and-create.js mongo:/tmp/ >/dev/null
docker exec -w /tmp mongo mongosh "${MONGOSH_ARGS[@]}" kamamotodb /tmp/drop-and-create.js

echo "==> Ожидание статуса READY"
for i in $(seq 1 60); do
  statuses=$(docker exec mongo mongosh "${MONGOSH_ARGS[@]}" kamamotodb --eval '
    ["styles", "potters", "terms"].map(c => db[c].getSearchIndexes()[0]?.status || "MISSING").join(" ")
  ')
  echo "    [$i] $statuses"
  if [ "$(echo "$statuses" | tr ' ' '\n' | sort -u)" = "READY" ]; then
    echo "==> Все индексы READY"
    exit 0
  fi
  sleep 5
done

echo "(!) Индексы не стали READY за 5 минут: docker logs mongot — там причина"
exit 1
