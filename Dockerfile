FROM node:8

ADD . /app

WORKDIR /app

VOLUME db.sqlite
VOLUME node_modules

EXPOSE 3000

ENTRYPOINT [ "./docker-entrypoint.sh" ]
