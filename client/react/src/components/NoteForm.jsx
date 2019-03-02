import React from 'react';
import PropTypes from 'prop-types';

/**
 * A generic form component for editing a note.
 * This can be used for either creating or updating a note.
 */
export default class NoteForm extends React.Component {
  /**
   * Create a new NoteForm component
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    const { title, text } = props;
    this.state = { title, text };
    this.updateTitleInput = this.updateTitleInput.bind(this);
    this.updateTextInput = this.updateTextInput.bind(this);
    this.submit = this.submit.bind(this);
  }

  /**
   * Handler for when the title input value changes.
   * This keeps the state in sync with the form.
   * @param {React.SyntheticEvent} e
   */
  updateTitleInput(e) {
    const { onFieldChanged } = this.props;
    this.setState({ title: e.target.value });
    onFieldChanged('title', e.target.value);
  }

  /**
   * Handler for when the text input value changes.
   * This keeps the state in sync with the form.
   * @param {React.SyntheticEvent} e
   */
  updateTextInput(e) {
    const { onFieldChanged } = this.props;
    this.setState({ text: e.target.value });
    onFieldChanged('text', e.target.value);
  }

  /**
   * Handler for when the form is submitted.
   */
  submit() {
    const { onSubmit, operation } = this.props;
    const { title, text } = this.state;
    onSubmit(title, text);
    if (operation === 'add') {
      this.setState({ title: '', text: '' });
    }
  }

  /**
   * @return {React.Component<NoteForm>}
   */
  render() {
    const { operation, onCancel } = this.props;
    const { title, text } = this.state;
    return (
      <div>
        <div>
          Title:
          {' '}
          <input onChange={this.updateTitleInput} value={title} />
        </div>
        <div>
          Text:
          {' '}
          <input onChange={this.updateTextInput} value={text} />
        </div>
        <button onClick={this.submit} type="submit">
          {operation === 'add' ? 'Add Note' : 'Save Note'}
        </button>
        {operation === 'update' && <button onClick={onCancel} type="submit">Cancel</button>}
      </div>
    );
  }
}
NoteForm.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  onFieldChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};
NoteForm.defaultProps = {
  onCancel: () => {},
};
