const { buildSchema } = require('graphql');
const shortid = require('shortid');

/**
 * GraphQL API definition
 */
// schema for listing, adding and mutating notes
const notesSchema = buildSchema(`
  type Note {
    id: ID!
    title: String
    text: String
  }
  input NoteInput {
    title: String
    text: String
  }
  type Mutation {
    addNote(input: NoteInput): Note
    updateNote(id: ID!, input: NoteInput): Note
  }
  type Query {
    notes: [Note]
    note(id: ID!): Note
  }
`);

// Resolvers for the API endpoints. This assumes a lowdb-based DB interface
const rootResolver = db => ({
  notes() {
    return db.get('notes').value();
  },
  note({ id }) {
    return db
      .get('notes')
      .find({ id })
      .value();
  },
  addNote({ input }) {
    const id = shortid.generate();
    db.get('notes')
      .push({ id, title: input.title, text: input.text })
      .write();
    return db
      .get('notes')
      .find({ id })
      .value();
  },
  updateNote({ id, input }) {
    return db
      .get('notes')
      .find({ id })
      .assign(input)
      .write();
  },
});
module.exports = { notesSchema, rootResolver };
