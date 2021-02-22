## Folder Structure
```
src
│   app.js      # App entry point
└───api         # Route handler
└───route       # Application routes
└───service     # Business logic
└───config      # Environment variables and configuration
└───loader      # Split the startup process into modules
└───model       # Database models
test
└───api         # api test folder
└───unit        # unit test folder
```

## Log Format
NCSA Common Log Format https://en.wikipedia.org/wiki/Common_Log_Format
TODO loglevel

## Others
distroless for security
gcr.io/distroless/nodejs:14
ISSUE: https://discuss.circleci.com/t/docker-build-fails-with-nonsensical-eperm-operation-not-permitted-copyfile/37364/30


## Deployment
at the point of time, changes to deployment update should be made for both docker-compose and kubernetes
TODO bazel to make image use nonroot 65532 by default
todo make image version automation instead of latest

## Development Setup
### Locally
yarn dev
with redis docker run -it -p 6379:6379 redis:alpine3.13

### Code Stye and Linter
Using eslint for code linting. Refer to .eslintrc.js for codestyle.
One can setup auto formating base on the eslintrc.js or run `npm lint` and `npm lint:fix`. 

## Test
TODO Jest source map for esm

---
## Reference
- .gitignore https://github.com/github/gitignore/blob/master/Node.gitignore
- .dockerignore https://github.com/RisingStack/kubernetes-nodejs-example/blob/master/.dockerignore
- Roman numeral specification https://en.wikipedia.org/wiki/Roman_numerals