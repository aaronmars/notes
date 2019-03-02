import React from 'react';
import renderer from 'react-test-renderer';
import { NoteList } from '../../src/components/NoteList';

jest.mock('../../src/components/Note', () => 'Note');
test('Empty NoteList is rendered', () => {
  const component = renderer.create(
    <NoteList notes={{}} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Populated NoteList is rendered', () => {
  const notesData = {
    id1: { title: 'Note1', text: 'Note1 text' },
    id2: { title: 'Note2', text: 'Note2 text' },
  };
  const component = renderer.create(<NoteList notes={notesData} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
