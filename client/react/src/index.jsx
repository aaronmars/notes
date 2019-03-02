import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './components/App';
import noteApp from '../../common/reducers';
import { fetchNotes } from '../../common/actions';

const store = createStore(noteApp, applyMiddleware(thunkMiddleware));

// Show the UI
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-app-container'),
);

// Tell the store to fetch the initial listing of notes from the store
store.dispatch(fetchNotes());
