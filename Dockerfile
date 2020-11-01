FROM node:12

ENV NODE_ENV=local

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000