# front/Dockerfile
FROM node:24-alpine

WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm ci

# Sourse files
COPY . .

# Build
RUN npm run build

# Copy build in volume when container started
CMD ["sh", "-c", "rm -rf /srv/front/* && cp -r dist/* /srv/front/"]
