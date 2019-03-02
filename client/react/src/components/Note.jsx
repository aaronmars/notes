import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NoteForm from './NoteForm';
import { updateNote, fetchNote, selectNote } from '../../../common/actions';

/**
 * A component for a single note within a note listing.
 * This component contains functionality to update the note as well.
 */
class Note extends React.Component {
  /**
   * Create a new Note component
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    const { title, text } = props;
    this.state = {
      mode: 'view',
      editTitle: title,
      editText: text,
    };
    this.editClicked = this.editClicked.bind(this);
    this.fieldChanged = this.fieldChanged.bind(this);
    this.updateNoteCancelled = this.updateNoteCancelled.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.selectNote = this.selectNote.bind(this);
  }

  /**
   * Handler for this component's edit button is clicked.
   */
  editClicked() {
    this.setState({ mode: 'edit' });
  }

  /**
   * Handler for when one of the fields in the editor form changes.
   * This sets the state so the temporary changes to the fields are
   *   available in case the update is submitted.
   * @param {*} field
   * @param {*} value
   */
  fieldChanged(field, value) {
    if (field === 'title') {
      this.setState({ editTitle: value });
    } else if (field === 'text') {
      this.setState({ editText: value });
    }
  }

  /**
   * Handler for when the update operation is cancelled.
   * This sets the component back to view mode.
   */
  updateNoteCancelled() {
    this.setState({ mode: 'view' });
  }

  /**
   * Handler for when the update operation is submitted.
   * This persists the update to the store.
   */
  updateNote() {
    const {
      updateNote: dispatchUpdateNote,
      selectNote: dispatchSelectNote,
      id,
      currentNote,
    } = this.props;
    const { editTitle, editText } = this.state;
    dispatchUpdateNote(id, editTitle, editText).then(() => {
      // Now that the update operation is done, switch to view mode
      //  and update the current note in case is is this note
      this.setState({ mode: 'view' });
      if (currentNote.id === id) {
        dispatchSelectNote(id, editTitle, editText);
      }
    });
  }

  /**
   * Handler for when the note is selected.
   */
  selectNote() {
    const { fetchNote: dispatchFetchNote, id } = this.props;
    dispatchFetchNote(id);
  }

  /**
   * @return {React.Component} The Note component
   */
  render() {
    const { id, title, text } = this.props;
    const { mode } = this.state;
    return mode === 'view' ? (
      <div>
        <div>
          <h3>{title}</h3>
        </div>
        <div>{text}</div>
        <button onClick={this.editClicked} type="submit">Edit</button>
        <Link to={`/${id}`} onClick={this.selectNote}>
          Select
        </Link>
      </div>
    ) : (
      <NoteForm
        operation="update"
        title={title}
        text={text}
        onSubmit={this.updateNote}
        onCancel={this.updateNoteCancelled}
        onFieldChanged={this.fieldChanged}
      />
    );
  }
}
Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  updateNote: PropTypes.func.isRequired,
  selectNote: PropTypes.func.isRequired,
  fetchNote: PropTypes.func.isRequired,
  currentNote: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};
Note.defaultProps = {
  currentNote: null,
};

const mapStateToProps = state => ({
  currentNote: state.currentNote,
});

export default connect(
  mapStateToProps,
  { updateNote, fetchNote, selectNote },
)(Note);
