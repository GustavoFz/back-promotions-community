FROM node:19-alpine

ARG ssh_prv_key
ARG ssh_pub_key

RUN apk update
RUN apk add git

# Authorize SSH Host
RUN mkdir -p /root/.ssh && \
    chmod 0700 /root/.ssh
RUN apk add --no-cache openssh-client \
 && ssh-keyscan github.com > ~/.ssh/known_hosts

# Add the keys and set permissions
RUN echo "$ssh_prv_key" > /root/.ssh/id_rsa && \
    echo "$ssh_pub_key" > /root/.ssh/id_rsa.pub && \
    chmod 600 /root/.ssh/id_rsa && \
    chmod 600 /root/.ssh/id_rsa.pub


RUN git clone git@github.com:Solidk-Tech/back-fogoso.git app
COPY . app/

WORKDIR /app/

RUN npm install
RUN npx prisma migrate deploy
RUN npm run build