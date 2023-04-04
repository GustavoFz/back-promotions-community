FROM node:19-alpine

WORKDIR /var/repo/solidk/docker-back

COPY /root/.ssh/* /root/.ssh/.
COPY . .
RUN git clone git@github.com:Solidk-Tech/back-fogoso.git .

RUN npm install
RUN npm build
RUN npx prisma migrate deploy
RUN npm start:prod