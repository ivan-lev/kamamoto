#!/bin/sh
set -e

# Использовать Bake для ускоренной сборки
export COMPOSE_BAKE=true

SERVICE="$1"

if [ -z "$SERVICE" ]; then
  echo "Usage: $0 <service>"
  echo "Available services: front, yuding, back, caddy, mongo, all"
  exit 1
fi

# Function for rebuild specific container
rebuild_service() {
  local svc="$1"
  echo "===== Processing $svc ====="

  echo "===== Stopping $svc (if running)... ====="
  docker compose stop "$svc" || true

  echo "===== Removing $svc container... ====="
  docker compose rm -f "$svc"

  echo "===== Building $svc image... ====="
  docker compose build --no-cache "$svc"

  echo "===== Starting $svc container... ====="
  case "$svc" in
    front|yuding)
      docker compose up "$svc"
      echo "===== $svc done ====="
      ;;
    back|caddy|mongo)
      docker compose up -d "$svc"
      echo "===== $svc running in background ====="
      ;;
    *)
      echo "Unknown service: $svc"
      exit 1
      ;;
  esac
}

if [ "$SERVICE" = "all" ]; then
  echo "===== Rebuilding all services ====="
  docker compose build --no-cache && docker compose up -d --remove-orphans
  echo "===== All services rebuilt and running ====="
else
  rebuild_service "$SERVICE"
fi