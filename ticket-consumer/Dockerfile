FROM alpine:latest
WORKDIR /app
COPY ./src ./src
COPY *.json ./

RUN apk add --update nodejs npm
RUN apk add --update npm

RUN npm install

WORKDIR /app/src


ENTRYPOINT [ "node", "/app/src/task_consumer.js" ]
