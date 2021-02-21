# node:14.15.5-buster
FROM node@sha256:810fc73fffa02751facec95f355202b2976441ac772bdb4bd650bd1b87e88776 as builder

USER node
RUN mkdir /home/node/app 
WORKDIR /home/node/app

COPY --chown=node:node index.js index.js
COPY --chown=node:node yarn.lock yarn.lock
COPY --chown=node:node package.json package.json
RUN yarn install --production

COPY --chown=node:node src/ src/
COPY --chown=node:node test/ test/


# node:14.15.5-buster
FROM node@sha256:810fc73fffa02751facec95f355202b2976441ac772bdb4bd650bd1b87e88776 as tester

USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY --from=builder /home/node/app/ .
RUN yarn install
COPY --chown=node:node jest.config.js jest.config.js

RUN yarn test:unit


# gcr.io/distroless/nodejs:14
FROM gcr.io/distroless/nodejs@sha256:de5d55e622cf464ad92dee2ba25684b6c5ade56c41248e55a4413e18914bff01

# USER nonroot
WORKDIR /app

ENV NODE_ENV=production
COPY --from=builder --chown=nonroot:nonroot /home/node/app .

CMD ["index.js"]