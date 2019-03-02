import {
  REQUEST_FETCH_NOTES,
  COMPLETE_FETCH_NOTES,
  REQUEST_FETCH_NOTE,
  COMPLETE_FETCH_NOTE,
  REQUEST_ADD_NOTE,
  COMPLETE_ADD_NOTE,
  REQUEST_UPDATE_NOTE,
  COMPLETE_UPDATE_NOTE,
  SELECT_NOTE,
} from './actions';

/**
 *
 * @param {*} state
 * @param {*} action
 * @return {Object}
 */
export default function noteApp(
  state = { notes: {}, isFetching: false, currentNote: null },
  action,
) {
  switch (action.type) {
    case REQUEST_FETCH_NOTES:
      return Object.assign({}, state, { isFetching: true });
    case COMPLETE_FETCH_NOTES:
      return Object.assign({}, state, {
        isFetching: false,
        notes: action.notes,
      });
    case REQUEST_FETCH_NOTE:
      return Object.assign({}, state, { isFetching: true });
    case COMPLETE_FETCH_NOTE:
      return Object.assign({}, state, {
        isFetching: false,
        currentNote: { id: action.id, title: action.title, text: action.text },
      });
    case REQUEST_ADD_NOTE:
      return Object.assign({}, state, { isFetching: true });
    case COMPLETE_ADD_NOTE:
      return Object.assign({}, state, {
        isFetching: false,
        notes: Object.assign({}, state.notes, {
          [action.id]: { title: action.title, text: action.text },
        }),
      });
    case REQUEST_UPDATE_NOTE:
      return Object.assign({}, state, { isFetching: true });
    case COMPLETE_UPDATE_NOTE:
      return Object.assign({}, state, {
        isFetching: false,
        notes: Object.assign({}, state.notes, {
          [action.id]: { title: action.title, text: action.text },
        }),
      });
    case SELECT_NOTE:
      return Object.assign({}, state, {
        currentNote: { id: action.id, title: action.title, text: action.text },
      });
    default:
      return state;
  }
}
