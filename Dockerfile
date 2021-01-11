FROM node:14.15.3-alpine3.10

RUN apk --no-cache add \
      bash \
      g++ \
      ca-certificates \
      lz4-dev \
      musl-dev \
      cyrus-sasl-dev \
      openssl-dev \
      make \
      git \
      python \
      supervisor

RUN npm --global config set user root
RUN mkdir /root/.npm-global
RUN export NPM_CONFIG_PREFIX='/root/.npm-global'
RUN npm install --global \
    nodemon

ADD ./scripts/start.sh /usr/bin/start.sh
RUN chmod +x /usr/bin/start.sh

ADD ./supervisor/node.ini /etc/supervisor.d/

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]

WORKDIR /consumer