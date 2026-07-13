#!/bin/bash
# Pulls the VPS Mongo database down to local, replacing local content.
# Backs up the local database first so a bad pull is always recoverable.
#
# Local side talks to whatever Mongo is actually running at DB_HOST:DB_PORT
# via the native mongodump/mongorestore binaries. VPS side always goes
# through docker compose exec (see mongo/dump.sh, mongo/restore.sh).
set -euo pipefail

: "${DEPLOY_HOST:?}" "${DEPLOY_PORT:?}" "${DEPLOY_USER:?}" "${DEPLOY_PATH:?}"
: "${DB_NAME:?}" "${DB_HOST:?}" "${DB_PORT:?}" "${DB_USER:?}" "${DB_PASS:?}"

REMOTE="$DEPLOY_USER@$DEPLOY_HOST"
STAMP=$(date +%Y%m%d-%H%M%S)

mkdir -p mongo/backups
echo "==> Backing up current local database ($DB_HOST:$DB_PORT/$DB_NAME)..."
mongodump --host "$DB_HOST" --port "$DB_PORT" --db "$DB_NAME" -u "$DB_USER" -p "$DB_PASS" --authenticationDatabase admin --archive --gzip > "mongo/backups/local-backup-$STAMP.gz"
echo "    saved to mongo/backups/local-backup-$STAMP.gz"

echo "==> Pulling VPS database to local (replaces all local data in '$DB_NAME')..."
ssh -p "$DEPLOY_PORT" "$REMOTE" "cd '$DEPLOY_PATH' && DB_NAME='$DB_NAME' bash mongo/dump.sh" \
	| mongorestore --host "$DB_HOST" --port "$DB_PORT" --db "$DB_NAME" -u "$DB_USER" -p "$DB_PASS" --authenticationDatabase admin --drop --archive --gzip

echo "==> Done."
