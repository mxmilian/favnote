import { notes } from 'data/dummyData';

const notesInitialState = {
  notes,
};

const notesReducer = (state = notesInitialState, action) => {
  console.log(action, state);
};

export default notesReducer;
