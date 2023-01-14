# VICA Engineering Assessment Backend Solution

## Task for Backend Development

Build a web service that fulfils the following requirements (50%):

1. For Node.js,use Express.js. For Python, use Flask or FastAPI.
2. Use MongoDB. Any database driver is accepted.
3. Routes
   - CRUD of user objects
   - CRUD of book objects
   - Borrowing and returning of books
4. Code formatting and linting
5. README file for setup instructions

Bonus points (10%) will be awarded for implementing a maker checker rule for adding, removing and updating users (i.e. an Admin changes to add/remove/update users will only be finalised after approved by another Admin).

Finally, also in your README file, explain and justify (50%):

1. How you structured your project
2. How you designed the APIs
3. The code implementation
4. Scalability of your project

## 1. How you structured your project

- src directory contains source codes, "server.ts" serve as the entry point to the app
- The code base is split into modules namely: books users, into their respective directory
- Typescript config at tsconfig.json, global types are defined in types dir
- eslint config at .eslintrc and can be executed using `npm run lint`

## 2. How you designed the APIs

- Each dir in modules dir contains a index, controller, service and model files
- index.ts contains the routes
- controller.ts handles the request by utilizing the required services.
- service.ts interact with db based onthe model and its meant to be highly reusable
- model.ts defines the schema for module

## 3. The code implementation

- mongoose is used to communicate with the mongodb
- "mongodb://localhost:27017/govtech" is the connection uri and "govtech" is the name of the db

### Authentication

- The app uses jwt and passportJS for creation and verification of the tokens.
- However for simplicity password are not needed to sign-in hence simply provide the user's name to sign-in

### Authorization

- CASL Library is used for authorization of the CRUD operations based on user's role as per the requirements.
- The configuration file is located at `src/modules/auth/abilities.ts`

## 4. Scalability of your project


## Run the App

    npm install
    npm run dev
