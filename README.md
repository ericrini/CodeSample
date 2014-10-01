### BUILD\RUN INSTRUCTIONS
```sh
> npm install
> node api/server.js
> open http://localhost:8080
```

### WHAT ISNT FINISHED YET
- Make the whole thing SSL and turn on secure cookies.
- Separate the HTTP session state into external database.
- Grunt build to minify client scripts, css and inline templates.
- A proper CSS preprocessor like LESS.
- Jasmine unit tests for UI & Mocha unit tests for API.
- Probably could make the API data layer more intuitive (IE: entities are POJOS).
- Validate data in client (the API does perform JSON schema based validation), but the client experience is not finished.






# Simple Developer Exercise

The savvy cats over at ACME Financial would like to be able to allow users to login to their account, check their balance and update their personal details. Write a simple web application (API and UI) using node.js and lowdb that lets users accomplish those tasks. Feel free to use any other libraries or tool chains as long as the core code is javascript and node.js.

You will find the base data file in ```/data```

## Requirements

* Login to the app via email and password
* Restrict access to valid a User
* Once logged in show the details of the user on the page
* Authorized users can check their account balance
* Allow the user to change their details
* lowdb (DB) -> https://github.com/typicode/lowdb
* node.js (v0.10.x) -> http://nodejs.org/ 

## Bonus Points

* Fully responsive UI
* Unit Tests of the API
* Functional Tests of the UI