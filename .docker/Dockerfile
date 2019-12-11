FROM node:8-alpine

RUN apk update && \
    apk upgrade && \
    apk add --no-cache

RUN yarn global add firebase-tools

WORKDIR /app/functions

RUN yarn install

WORKDIR /app
