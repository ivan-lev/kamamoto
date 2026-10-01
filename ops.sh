#!/bin/bash
set -e

export COMPOSE_BAKE=true

SERVICE="$1"

if [ -z "$SERVICE" ]; then
  echo "Usage: $0 <command|service>"
  echo ""
  echo "Commands:"
  echo "  up       — build and start all services"
  echo "  down     — stop and remove all containers"
  echo "  prune    — remove stopped containers, unused networks, dangling images, build cache"
  echo "  all      — rebuild all services from scratch (no cache)"
  echo ""
  echo "Services (rebuild single):"
  echo "  front | yuding | back | caddy | mongo"
  exit 1
fi

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

case "$SERVICE" in
  up)
    echo "===== Building and starting all services ====="
    docker compose up --build -d --remove-orphans
    echo "===== All services running ====="
    ;;
  down)
    echo "===== Stopping and removing all containers ====="
    docker compose down
    echo "===== All services stopped ====="
    ;;
  prune)
    # тома не трогаем: в caddy_data сертификаты, в front_build/yuding_build сборки.
    # image prune без -a: иначе после down удалятся образы mongo/caddy, а pull с VPS бывает недоступен
    echo "===== Disk usage before ====="
    df -h /
    echo "===== Pruning unused docker resources ====="
    docker container prune -f
    docker network prune -f
    docker image prune -f
    docker builder prune -f # кэш сборки копится от build --no-cache
    echo "===== Disk usage after ====="
    df -h /
    docker system df
    echo "===== Prune done ====="
    ;;
  all)
    echo "===== Rebuilding all services ====="
    docker compose build --no-cache && docker compose up -d --remove-orphans
    echo "===== All services rebuilt and running ====="
    ;;
  *)
    rebuild_service "$SERVICE"
    ;;
esac