# front/Dockerfile
FROM node:24-alpine

WORKDIR /app

# Add variables from docker-compose
ARG VITE_MAP_API_KEY
ENV VITE_MAP_API_KEY=$VITE_MAP_API_KEY

# Dependencies
COPY package*.json ./
RUN npm ci

# Sourse files
COPY . .

# Build
RUN npm run build

# Copy build in volume when container started
CMD ["sh", "-c", "rm -rf /srv/front/* && cp -r dist/* /srv/front/"]
