# Notes
A web app for managing a list of notes.
This is a contrived project to demonstrate technonlgies, rather than being something actually useful or pretty.

## Getting the code
>this guide assumes `yarn` if you prefer `npm`, feel free to use the `npm` equivalents

Clone the repo:
```
git clone https://github.com/aaronmars/notes.git
```

Inside the notes directory, run `yarn` to install dependencies:
```
cd notes
yarn
```

## Building the app
The app uses webpack to create a bundle.
This is available as a `package.json` script.
```
yarn build
```
Once webpack is done, you should have `dist/bundle.js`.

## Running the app
Use the `serve` script.
```
yarn serve
```
Your console should now tell you that the server is running on port 4000. You should be able to navigate to `http://localhost:4000/react` in a browser to view the app.

As a fun bonus, [GraphiQL](https://github.com/graphql/graphiql) will be viewable at `http://localhost:4000/api`.

>NOTE: The bundler is really just there to transpile JSX with babel (using `@babel/preset-react`). Please use a modern browser so there aren't any issues with JS syntax.

## Running the tests
There is the start of a snapshot testing paradigm using `jest`. This can be expanded further, and also incorporate DOM testing.
```
yarn test
```
