import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AddNote from './AddNote';
import NoteList from './NoteList';
import NoteViewer from './NoteViewer';

/**
 * The main app.
 * This features a note listing, and a note viewer.
 * The note viewer is directed when the final segment in the URL is a note ID
 */
export default class App extends React.Component {
  /**
   * Create a new App component
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    // Here we have the only styling in the whole app!
    // These are just here to make the listing
    //   and the viewer appear side-by-side
    this.flexStyle = { display: 'flex' };
    this.containerStyle = { padding: '1em' };
  }

  /**
   * @return {React.Component<App>} The app component
   */
  render() {
    return (
      <BrowserRouter basename="/react">

        <div style={this.flexStyle}>
          <div style={this.containerStyle}>
            <AddNote />
            <NoteList />
          </div>

          <div style={this.containerStyle}>
            <Route path="/:noteId" component={NoteViewer} />
          </div>
        </div>

      </BrowserRouter>
    );
  }
}
