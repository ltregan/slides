###############################
#    Build stage (node/npm)   #
###############################
FROM node:10-alpine as builder

RUN apk update && apk add --no-cache \
    autoconf \
    automake \
    bash \
    g++ \
    libc6-compat \
    libjpeg-turbo-dev \
    libpng-dev \
    make \
    nasm

RUN npm config set loglevel warn \
  && npm set progress=false

# install dependencies
COPY package*.json /tmp/
RUN cd /tmp && npm ci
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/
RUN rm -rf /tmp/node_modules

# copy source and build
WORKDIR /usr/src/app
COPY . .

ENV NODE_ENV "production"
RUN npm run build
RUN rm -rf node_modules test

###############################
# Webserver container (nginx) #
###############################
FROM nginx:alpine as web

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/.htpasswd /etc/nginx/.htpasswd
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app /usr/share/nginx/html

EXPOSE 8080