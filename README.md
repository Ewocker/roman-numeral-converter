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

## Others
distroless for security
gcr.io/distroless/nodejs:14


## Deployment
at the point of time, changes to deployment update should be made for both docker-compose and kubernetes

## Development Setup
### Code Stye and Linter
Using eslint for code linting. Refer to .eslintrc.js for codestyle.
One can setup auto formating base on the eslintrc.js or run `npm lint` and `npm lint:fix`. 

## Test
TODO Jest source map for esm

---
## Reference
- .gitignore https://github.com/github/gitignore/blob/master/Node.gitignore
- Roman numeral specification https://en.wikipedia.org/wiki/Roman_numerals