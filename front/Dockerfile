# make a build version of frontend app
FROM node:24-alpine AS builder
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
#RUN npm run build

# host the build on nginx and wait connection on port 80
FROM nginx:alpine

# install curl for diagnostics
RUN apk add --no-cache curl

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]