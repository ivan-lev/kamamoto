# make a build of backend app with api
FROM node:24-alpine

# install curl for diagnostics
RUN apk add --no-cache curl
# install additional packages for bcrypt support
RUN apk --no-cache add --virtual builds-deps build-base python3 py3-pip

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./
COPY tsconfig.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY src/ ./src/

# dir for winston logger
RUN mkdir -p /app/logs && chown -R node:node /app/logs

# Собираем TypeScript
RUN npm run build-docker

EXPOSE 3000
USER node
CMD ["node", "dist/app.js"]