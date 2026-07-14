#!/bin/bash
# VPS-side helper: dumps the dockerized Mongo database (gzip archive) to
# stdout. Must be run on the VPS from the directory containing
# docker-compose.yml. Reads Mongo root credentials from the mongo
# container's own env (MONGO_INITDB_ROOT_USERNAME/PASSWORD) so secrets
# never appear in this script's own argv or in any wrapping ssh command
# line.
#
# For local use, db-push.sh/db-pull.sh call the native mongodump/mongorestore
# binaries directly instead, since local Mongo usually isn't the docker
# container (see .env DB_HOST/DB_PORT for whatever is actually in use).
set -euo pipefail

DB_NAME="${DB_NAME:?DB_NAME is not set}"

docker compose exec -T mongo sh -c '
	mongodump --archive --gzip --db="$1" -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin
' _ "$DB_NAME"
