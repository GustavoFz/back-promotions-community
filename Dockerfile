FROM node:19-alpine

WORKDIR /api

COPY . .

RUN yarn install
RUN yarn build
RUN npx prisma migrate deploy