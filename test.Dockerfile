# node:14.15.5-alpine3.13
FROM node@sha256:03b86ea1f9071a99ee3de468659c9af95ca0bedbcd7d32bf31d61fa32c1a8ab3

USER node
RUN mkdir /home/node/app 
WORKDIR /home/node/app

COPY --chown=node:node yarn.lock yarn.lock
COPY --chown=node:node package.json package.json
RUN yarn install

COPY --chown=node:node test/api test/api
COPY --chown=node:node jest.config.js jest.config.js

CMD ["yarn", "test:api"]