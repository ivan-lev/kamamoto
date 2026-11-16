# yuding/Dockerfile
FROM node:26-alpine

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
