/**
 * Generic function for fetching from the GQL API
 * @param {String} query The GraphQL query
 */
function fetchApi(query) {
  return fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query }),
  }).then(r => r.json());
}

/**
 * Get all of the notes
 * @return {String} JSON representation of the notes
 */
export function getNotes() {
  return fetchApi(`{
    notes {
      id
      title
      text
    }
  }`).then(response => response.data.notes);
}

/**
 * Fetch a note based on its ID
 * @param {String} id The DB ID of the note to fetch
 */
export function getNoteById(id) {
  return fetchApi(`{
    note(id: "${id}") {
      id
      title
      text
    }
  }`).then(response => response.data.note);
}

/**
 * Add a note, supplying its fields.
 * @param {String} title The new note's title
 * @param {String} text The new note's text
 */
export function addNote(title, text) {
  return fetchApi(`mutation {
    addNote(input: {text: "${text}", title: "${title}"}) {
      id
      text
      title
    }
  }`).then(response => response.data.addNote);
}

/**
 *
 * @param {String} id The DB ID of the note to update
 * @param {String} title The new title of the note.
 * @param {String} text The new text for the note.
 */
export function updateNote(id, title = null, text = null) {
  return fetchApi(`mutation {
    updateNote(id: "${id}", input: {text: "${text}", title: "${title}"}) {
      id
      title
      text
    }
  }`).then(response => response.data.updateNote);
}
