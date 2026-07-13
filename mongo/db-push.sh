#!/bin/bash
# Pushes the local Mongo database to the VPS, replacing its content.
# Backs up the VPS database first so a bad push is always recoverable.
#
# Local side talks to whatever Mongo is actually running at DB_HOST:DB_PORT
# (native mongod, docker, whatever) via the native mongodump/mongorestore
# binaries. VPS side always goes through docker compose exec, since that's
# how Mongo actually runs in production (see mongo/dump.sh, mongo/restore.sh).
set -euo pipefail

: "${DEPLOY_HOST:?}" "${DEPLOY_PORT:?}" "${DEPLOY_USER:?}" "${DEPLOY_PATH:?}"
: "${DB_NAME:?}" "${DB_HOST:?}" "${DB_PORT:?}" "${DB_USER:?}" "${DB_PASS:?}"

REMOTE="$DEPLOY_USER@$DEPLOY_HOST"
STAMP=$(date +%Y%m%d-%H%M%S)

echo "==> Backing up current VPS database..."
ssh -p "$DEPLOY_PORT" "$REMOTE" "mkdir -p '$DEPLOY_PATH/mongo/backups' && cd '$DEPLOY_PATH' && DB_NAME='$DB_NAME' bash mongo/dump.sh > 'mongo/backups/backup-$STAMP.gz'"
echo "    saved to $DEPLOY_PATH/mongo/backups/backup-$STAMP.gz on the VPS"

echo "==> Dumping local database ($DB_HOST:$DB_PORT/$DB_NAME) and pushing to VPS (replaces all data there)..."
mongodump --host "$DB_HOST" --port "$DB_PORT" --db "$DB_NAME" -u "$DB_USER" -p "$DB_PASS" --authenticationDatabase admin --archive --gzip \
	| ssh -p "$DEPLOY_PORT" "$REMOTE" "cd '$DEPLOY_PATH' && DB_NAME='$DB_NAME' bash mongo/restore.sh"

echo "==> Done."
