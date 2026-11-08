#!/usr/bin/env bash
# Создание/обновление поисковых индексов на локальной MongoDB (127.0.0.1:27017).
set -euo pipefail
cd "$(dirname "$0")"
DB_HOST="${DB_HOST:-127.0.0.1:27017}"
exec mongosh --quiet -u "${DB_USER:-admin}" -p "${DB_PASS:?set DB_PASS}" --authenticationDatabase admin --host "$DB_HOST" kamamotodb ./apply-indexes.js
