/**
 * Generic function for fetching from the GQL API
 * @param {String} query The GraphQL query
 */
async function fetchApi(query) {
  const response = await fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  return response.json();
}

/**
 * Get all of the notes
 * @return {String} JSON representation of the notes
 */
export async function getNotes() {
  const response = await fetchApi(`{
    notes {
      id
      title
      text
    }
  }`);
  return response.data.notes;
}

/**
 * Fetch a note based on its ID
 * @param {String} id The DB ID of the note to fetch
 */
export async function getNoteById(id) {
  const response = await fetchApi(`{
    note(id: "${id}") {
      id
      title
      text
    }
  }`);
  return response.data.note;
}

/**
 * Add a note, supplying its fields.
 * @param {String} title The new note's title
 * @param {String} text The new note's text
 */
export async function addNote(title, text) {
  const response = await fetchApi(`mutation {
    addNote(input: {text: "${text}", title: "${title}"}) {
      id
      text
      title
    }
  }`);
  return response.data.addNote;
}

/**
 *
 * @param {String} id The DB ID of the note to update
 * @param {String} title The new title of the note.
 * @param {String} text The new text for the note.
 */
export async function updateNote(id, title = null, text = null) {
  const response = await fetchApi(`mutation {
    updateNote(id: "${id}", input: {text: "${text}", title: "${title}"}) {
      id
      title
      text
    }
  }`);
  return response.data.updateNote;
}
