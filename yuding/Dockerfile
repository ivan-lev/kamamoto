# yuding/Dockerfile
FROM node:24-alpine

WORKDIR /app

# Зависимости
COPY package*.json ./
RUN npm ci

# Исходники
COPY . .

# Собираем SPA
RUN npm run build

# При старте контейнера копируем билд в volume
CMD ["sh", "-c", "rm -rf /srv/yuding/* && cp -r dist/* /srv/yuding/"]



# Старая весрия

# yuding/Dockerfile
# FROM node:24-alpine AS builder

# WORKDIR /app

# # Копируем package.json и package-lock.json
# COPY package*.json ./

# # Устанавливаем зависимости
# RUN npm ci

# # Копируем исходный код
# COPY . .

# # Собираем приложение
# RUN npm run build

# # Финальный образ только с собранными файлами
# FROM alpine:latest

# # Устанавливаем необходимые инструменты для копирования
# RUN apk add --no-cache bash

# # Создаем директорию для статических файлов
# RUN mkdir -p /srv/yuding

# # Копируем собранные файлы из builder stage
# COPY --from=builder /app/dist /srv/yuding

# # Создаем volume точку монтирования
# VOLUME /srv/yuding

# # Команда которая просто держит контейнер активным
# CMD ["tail", "-f", "/dev/null"]