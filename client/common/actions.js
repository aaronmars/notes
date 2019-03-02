import {
  addNote as addNoteToApi,
  getNoteById as getNoteByIdFromApi,
  getNotes as getNotesFromApi,
  updateNote as updateNoteToApi,
} from './apiLib';

export const REQUEST_FETCH_NOTES = 'REQUEST_FETCH_NOTES';
export const COMPLETE_FETCH_NOTES = 'COMPLETE_FETCH_NOTES';
export const REQUEST_FETCH_NOTE = 'REQUEST_FETCH_NOTE';
export const COMPLETE_FETCH_NOTE = 'COMPLETE_FETCH_NOTE';
export const REQUEST_ADD_NOTE = 'REQUEST_ADD_NOTE';
export const COMPLETE_ADD_NOTE = 'COMPLETE_ADD_NOTE';
export const REQUEST_UPDATE_NOTE = 'REQUEST_UPDATE_NOTE';
export const COMPLETE_UPDATE_NOTE = 'COMPLETE_UPDATE_NOTE';
export const SELECT_NOTE = 'SELECT_NOTE';

/*
 * action creators
 */

/**
 * @return {Object}
 */
export function requestFetchNotes() {
  return { type: REQUEST_FETCH_NOTES };
}

/**
 *
 * @param {Object} response The response from the API abstraction
 * @return {Object}
 */
export function completeFetchNotes(response) {
  return {
    type: COMPLETE_FETCH_NOTES,
    notes: response.reduce((acc, note) => {
      acc[note.id] = { title: note.title, text: note.text };
      return acc;
    }, {}),
  };
}

/**
 *
 * @param {*} id
 * @return {Object}
 */
export function requestFetchNote(id) {
  return { type: REQUEST_FETCH_NOTE, id };
}

/**
 *
 * @param {*} id
 * @param {*} title
 * @param {*} text
 * @return {Object}
 */
export function completeFetchNote(id, title, text) {
  return {
    type: COMPLETE_FETCH_NOTE,
    id,
    title,
    text,
  };
}

/**
 *
 * @param {String} title
 * @param {String} text
 * @return {Object}
 */
export function requestAddNote(title, text) {
  return { type: REQUEST_ADD_NOTE, title, text };
}

/**
 *
 * @param {String} id
 * @param {String} title
 * @param {String} text
 * @return {Object}
 */
export function completeAddNote(id, title, text) {
  return {
    type: COMPLETE_ADD_NOTE,
    id,
    title,
    text,
  };
}

/**
 *
 * @param {String} id
 * @param {String} title
 * @param {String} text
 * @return {Object}
 */
export function requestUpdateNote(id, title, text) {
  return {
    type: REQUEST_UPDATE_NOTE,
    id,
    title,
    text,
  };
}

/**
 *
 * @param {String} id
 * @param {String} title
 * @param {String} text
 * @return {Object}
 */
export function completeUpdateNote(id, title, text) {
  return {
    type: COMPLETE_UPDATE_NOTE,
    id,
    title,
    text,
  };
}

/**
 * @return {*}
 */
export function fetchNotes() {
  return (dispatch) => {
    dispatch(requestFetchNotes());
    return getNotesFromApi().then((receivedNotes) => {
      dispatch(completeFetchNotes(receivedNotes));
    });
  };
}

/**
 *
 * @param {*} title
 * @param {*} text
 * @return {*}
 */
export function addNote(title, text) {
  return (dispatch) => {
    dispatch(requestAddNote(title, text));
    return addNoteToApi(title, text).then((resp) => {
      dispatch(completeAddNote(resp.id, resp.title, resp.text));
    });
  };
}

/**
 *
 * @param {*} id
 * @param {*} title
 * @param {*} text
 * @return {*}
 */
export function updateNote(id, title, text) {
  return (dispatch) => {
    dispatch(requestUpdateNote(id, title, text));
    return updateNoteToApi(id, title, text).then((resp) => {
      dispatch(completeUpdateNote(resp.id, resp.title, resp.text));
    });
  };
}

/**
 *
 * @param {*} id
 * @return {*}
 */
export function fetchNote(id) {
  return (dispatch) => {
    dispatch(requestFetchNote(id));
    return getNoteByIdFromApi(id).then((resp) => {
      dispatch(completeFetchNote(resp.id, resp.title, resp.text));
    });
  };
}

/**
 *
 * @param {*} id
 * @param {*} title
 * @param {*} text
 * @return {*}
 */
export function selectNote(id, title, text) {
  return {
    type: SELECT_NOTE,
    id,
    title,
    text,
  };
}
