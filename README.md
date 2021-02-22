# Roman Numeral Convertor
A application that converts numbers to roman numerals.

# Service
## Service Logic
Main convertion logic is located in `src/service/intToRomanNumeral.js`.

## Service Diagram
![draft service diagram](./doc/draft-service-diagram.png)
 
## Folder Structure
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
API testing are currently not automated, to run it server must up and running.
```bash
$ yarn test:api
```

Test can also be done during deployment, see [Deployment>kubernetes](#kubernetes) on how to deploy.

## Load Test
>💡 Below load testing results can only be used for reference.
The test setup is through running on a one node k8s instance (kind k8s@1.20.2) using `vegeta` with resource:
```yaml
resources:
  requests:
    memory: "100Mi"
  limits:
    cpu: "200m"
    memory: "200Mi"
```
Below are the average outputs of 150rps and 200rps. The result shows that application is able to take around 150rps at most for better performance.

```bash 
❯ echo "GET http://localhost:8080/romannumeral?query=3999" | vegeta attack -duration=10s -rate=200 |  vegeta report
Requests      [total, rate, throughput]         2000, 200.09, 199.00
Duration      [total, attack, wait]             10.05s, 9.995s, 55.1ms
Latencies     [min, mean, 50, 90, 95, 99, max]  10.688ms, 515.128ms, 482.887ms, 822.74ms, 1.213s, 1.459s, 1.93s
Bytes In      [total, mean]                     92000, 46.00
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           100.00%
Status Codes  [code:count]                      200:2000  
Error Set:
❯ echo "GET http://localhost:8080/romannumeral?query=3999" | vegeta attack -duration=10s -rate=150 |  vegeta report
Requests      [total, rate, throughput]         1500, 150.09, 146.41
Duration      [total, attack, wait]             10.245s, 9.994s, 251.367ms
Latencies     [min, mean, 50, 90, 95, 99, max]  2.646ms, 6.861ms, 4.354ms, 8.109ms, 14.261ms, 46.544ms, 258.782ms
Bytes In      [total, mean]                     69000, 46.00
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           100.00%
Status Codes  [code:count]                      200:1500  
Error Set:
```

## TODO
- Jest source map for esm
- more detailed API test
- test cache layer


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

API test can also be done throught kubernetes
```bash
$ kubectl apply -n <namespace> -f kubernetes/runtime.yaml
```

## custom
One can add a configuration to `src/config/index.js` for any custom setup. Below are the fields that can be configured.
```javascript
{
  name: 'roman-numeral-convertor',
  redisURL: 'redis://127.0.0.1:6379',
  enableRedisCache: false,
  cacheSyncInterval: 5000, // ms
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
NodeJS version 14 is suggested for local development.

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

# Logging
Follow [NCSA Common Log Format](https://en.wikipedia.org/wiki/Common_Log_Format) for HTTP access logs. Non HTTP access logs are in format of `YYYY-MM-DD HH:mm:ss.SSS [LEVEL] message`, and if necessary can be easily changed to centralized logging server required format.

Application log level can be set through configuration, see [Deployment>custom](#custom).


---
# Reference
- .gitignore https://github.com/github/gitignore/blob/master/Node.gitignore
- .dockerignore https://github.com/RisingStack/kubernetes-nodejs-example/blob/master/.dockerignore
- Roman numeral specification https://en.wikipedia.org/wiki/Roman_numerals