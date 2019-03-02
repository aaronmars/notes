import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NoteForm from './NoteForm';
import { addNote } from '../../../common/actions';

/**
 * A component for adding a new note.
 */
class AddNote extends React.Component {
  /**
   * Create a new AddNote component
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = { title: '', text: '' };
    this.addNewNote = this.addNewNote.bind(this);
    this.fieldChanged = this.fieldChanged.bind(this);
  }

  /**
   * Adds a note to the store, and then resets the component state
   */
  addNewNote() {
    const { title, text } = this.state;
    const { addNote: dispatchAddNote } = this.props;
    dispatchAddNote(title, text).then(() => {
      this.setState({ title: '', text: '' });
    });
  }

  /**
   * Updates the state when the title or text fields change
   * @param {*} field
   * @param {*} value
   */
  fieldChanged(field, value) {
    this.setState({ [field]: value });
  }

  /**
   * @return {React.Component<AddNote>} A form for adding a note.
   */
  render() {
    const { title, text } = this.state;
    return (
      <NoteForm
        title={title}
        text={text}
        operation="add"
        onSubmit={this.addNewNote}
        onFieldChanged={this.fieldChanged}
      />
    );
  }
}
AddNote.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default connect(
  null,
  { addNote },
)(AddNote);
