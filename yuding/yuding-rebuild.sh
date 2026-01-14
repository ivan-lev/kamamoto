#!/usr/bin/env bash
set -e

SERVICE=yuding

echo "▶ Building image for $SERVICE..."
docker compose build $SERVICE

echo "▶ Running build container..."
docker compose up --no-deps $SERVICE

echo "✔ $SERVICE build finished"
