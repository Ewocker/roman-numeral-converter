## Folder Structure
```
src
│   app.js       # App entry point
└───api          # route controllers for all the endpoints of the app
└───config       # Environment variables and configuration related stuff
└───loader       # Split the startup process into modules
└───model        # Database models
└───service      # Business logic
```

## Others
distroless for security
gcr.io/distroless/nodejs:14


## Deployment
at the point of time, changes to deployment update should be made for both docker-compose and kubernetes

## Development Setup
### Code Stye and Linter
Using eslint for code linting. Refer to .eslintrc.js for codestyle.
One can setup auto formating base on the eslintrc.js or run `npm lint` and `npm lint:fix`. 

---
## Reference
- .gitignore https://github.com/github/gitignore/blob/master/Node.gitignore
- Roman numeral specification https://en.wikipedia.org/wiki/Roman_numerals