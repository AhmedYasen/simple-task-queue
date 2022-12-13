FROM alpine:latest
WORKDIR /app
RUN mkdir commands src
COPY ./commands ./commands
COPY ./src ./src
COPY *.json ./

RUN apk add --update nodejs npm
RUN apk add --update npm

RUN npm install

EXPOSE 3000

WORKDIR /app/src


ENTRYPOINT [ "node", "/app/src/cli.js", "serve"]
