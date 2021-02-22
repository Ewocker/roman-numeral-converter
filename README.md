# Folder Structure
```
index.js        # For ESM module only
src
│   app.js      # Entry point
└───api         # Route handler
└───route       # Application routes
└───service     # Business logic
└───config      # Configuration
└───model       # Models and Classes
└───util        # Utilities
test
└───api         # api test folder
└───unit        # unit test folder
```

# Log Format
NCSA Common Log Format https://en.wikipedia.org/wiki/Common_Log_Format

# Tech Framework used
Major Dependencies
- HTTP Routing Framework: `koa` stack + `boom`
- ES6 Module: `esm`
- Cache: `redis`

Utility Dependencies
- Metrics: `prom-client`
- Validation: `validator`
- Logging: `simple-node-logger` + `koa-accesslog`

Test Dependencies
- HTTP Client: `axios`
- Test Framework: `jest` stack

Dev Dependencies
- Linter: `eslint` stack
- Others: `nodemon`, ` cross-env`
# Testing
## Unit Test
Unit testing is ran automatically when building docker image. To run it locally,
```bash
$ yarn test:unit
```
## API Test
API testing are currently not automated, to run it server must 

# Deployment
There are 2 of environments in `src/config/index.js` which suites better for deployment.
> 💡 currently changes to deployment spec must be made for both docker-compose and kubernetes
## docker-compose
To deploy through docker compose, one should refer to `docker-compose.yaml` for setup configuration.

Note that redis volume is mounted at /tmp/data.
```bash
$ docker-compose up
```
## kubernetes
To deploy on kubernetes, one should refer to `kubernetes` folder for all resource configuration.

Note that redis is being deployed as a statless application, which do not persist data over restart.
```bash
$ kubectl apply -n <namespace> -f kubernetes/redis-cache.yaml -f kubernetes/roman-numeral-convertor.yaml
```

## custom
One can add a configuration to `src/config/index.js` for any custom setup. Below are the fields that can be configured.
```javascript
{
  name: 'roman-numeral-convertor',
  redisURL: 'redis://127.0.0.1:6379',
  enableRedisCache: false,
  cacheSyncInterval: 5000,
  logLevel: 'debug' // trace, debug, info, warn, error 
}
```

# Build
The application is a node js application, currently built is for docker image only.

## Docker
Current docker image contains 2 intermediate images and the final image, where
- builder - for building production image
- tester - for testing application (which installs dev dependencies)
- final - use distroless image for security

TODO: bazel to make image use nonroot 65532 by default, currently this need to be specified when starting container with the container runtime.

# Pipeline 
This project currently only implement CI using CircleCI without any CD automation.
Every commit push to the repository will have a corresponding pipeline build.
The CI pipeline will build the docker image and run unit test during build.
Built images will be tagged with branch name and push to dockerhub.

# Development Setup
There are 2 of environments in `src/config/index.js` which can be used develop locally.
One must install all dependencies before dev through `yarn install`. 

___!!! Do not use npm as it yarn.lock is being used for install at build time___
## local
```bash
$ yarn dev
```

## local-redis
This requires a running redis instance, one can use redis docker image for quick development usage.
```bash
$ yarn dev:redis
$ docker run -it -p 6379:6379 redis:alpine3.13
```

## Code Style and Linter
Using eslint for code linting. Refer to .eslintrc.js for codestyle.
One can setup auto formating base on the eslintrc.js or run `npm lint` and `npm lint:fix`. 

# Test
TODO Jest source map for esm

---
# Reference
- .gitignore https://github.com/github/gitignore/blob/master/Node.gitignore
- .dockerignore https://github.com/RisingStack/kubernetes-nodejs-example/blob/master/.dockerignore
- Roman numeral specification https://en.wikipedia.org/wiki/Roman_numerals