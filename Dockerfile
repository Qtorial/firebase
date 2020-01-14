FROM node:10-alpine

RUN apk update && \
    apk upgrade && \
    apk add --no-cache

RUN yarn global add firebase-tools

WORKDIR /app
