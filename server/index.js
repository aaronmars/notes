/* eslint-disable no-console */
const fs = require('fs');
const Koa = require('koa');
const mount = require('koa-mount');
const serveStatic = require('koa-static');
const sendFile = require('koa-send');
const Router = require('koa-router');
const graphqlHTTP = require('koa-graphql');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const graphQL = require('./graphQL');

// Set up lowdb to read from a file
const dbFile = 'server/db.json';
if (!fs.existsSync(dbFile)) {
  console.log(`File ${dbFile} does not exist... creating`);
  fs.openSync(dbFile, 'w');
}
const adapter = new FileSync(dbFile);
const db = low(adapter);
db.defaults({ notes: [] }).write();
console.log(`Using file ${dbFile} for data.`);
console.log();

/**
 * Server config
 */
const app = new Koa();

// Use a router to always serve the react html whenever /react is requested
//   (with or without more segments)
const router = new Router();
router.get(['/react', '/react/:noteId'], async ctx => sendFile(ctx, 'client/react/index.html'));

// API Access
app.use(
  mount(
    '/api',
    graphqlHTTP({
      schema: graphQL.notesSchema,
      rootValue: graphQL.rootResolver(db),
      graphiql: true,
    }),
  ),
);

// Client App access
app.use(router.routes());
app.use(router.allowedMethods());

// Everything else... for static asset serving
app.use(serveStatic('.'));

const port = 4000;
app.listen(port);
console.log(`Listening on port ${port}.`);
console.log();
console.log(`To view the React App, use http://localhost:${port}/react`);
console.log(`To interact with the GraphQL API, use http://localhost:${port}/api`);
