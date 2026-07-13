#!/bin/bash
# VPS-side helper: restores the dockerized Mongo database from a gzip
# archive on stdin. Must be run on the VPS from the directory containing
# docker-compose.yml. --drop replaces existing collections rather than
# merging with them. Reads Mongo root credentials from the mongo
# container's own env, same reasoning as dump.sh.
set -euo pipefail

DB_NAME="${DB_NAME:?DB_NAME is not set}"

docker compose exec -T mongo sh -c '
	mongorestore --archive --gzip --drop --db="$1" -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin
' _ "$DB_NAME"
