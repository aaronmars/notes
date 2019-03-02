import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchNote } from '../../../common/actions';

/**
 * A simple viewer for a note based on the `currentNote` field from the store.
 */
class NoteViewer extends React.Component {
  /**
   * Create a new NoteViewer component,
   * It can be populated on construction by supplying
   *   a `match` object from a router.
   * @param {*} props
   */
  constructor(props) {
    super(props);
    const { match, fetchNote: dispatchFetchNote } = props;
    if (match) {
      dispatchFetchNote(match.params.noteId, true);
    }
  }

  /**
   * @return {React.Component<NoteEditor>}
   */
  render() {
    const { currentNote } = this.props;
    return currentNote === null ? (
      <p>No note selected</p>
    ) : (
      <div>
        <p>
          Now viewing note ID
          {currentNote.id}
        </p>
        <h1>{currentNote.title}</h1>
        <h2>{currentNote.text}</h2>
      </div>
    );
  }
}
NoteViewer.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ noteId: PropTypes.string.isRequired }) }),
  fetchNote: PropTypes.func.isRequired,
  currentNote: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};
NoteViewer.defaultProps = {
  match: { params: { noteId: null } },
  currentNote: null,
};

const mapStateToProps = state => ({ currentNote: state.currentNote });

export default connect(
  mapStateToProps,
  { fetchNote },
)(NoteViewer);
