# make a build of backend app with api
FROM node:24-alpine AS builder

# install curl for diagnostics
RUN apk add --no-cache curl

WORKDIR /app
COPY package*.json ./
# install additional packages for bcrypt support
RUN apk --no-cache add --virtual builds-deps build-base python3 py3-pip
RUN npm ci --omit=dev
COPY . ./
# dir for winston logger
RUN mkdir -p /app/logs && chown -R node:node /app/logs
#RUN npm run build

EXPOSE 3000
USER node
CMD ["node", "dist/app.js"]