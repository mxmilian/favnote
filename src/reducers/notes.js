import { notes, articles, twitters } from 'data/dummyData';

const notesInitialState = {
  notes,
  articles,
  twitters,
};

const notesReducer = (state = notesInitialState, action) => {
  console.log(state, action);
  return state;
};

export default notesReducer;
