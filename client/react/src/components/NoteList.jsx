import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Note from './Note';

/**
 * Render a list of Notes fetched from the API
 */
export function NoteList(props) {
  const { notes } = props;
  return (
    <div>
      {Object.entries(notes).map(([id, note]) => (
        <Note key={id} title={note.title} text={note.text} id={id} />
      ))}
    </div>
  );
}
NoteList.propTypes = {
  notes: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({ notes: state.notes });

export default connect(mapStateToProps)(NoteList);
