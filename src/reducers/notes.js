import { notes, articles, twitters } from 'data/dummyData';
import { REMOVE_NOTE } from 'actions/notes';

const notesInitialState = {
  notes,
  articles,
  twitters,
};

const notesReducer = (state = notesInitialState, action) => {
  const { type } = action;
  switch (type) {
    case REMOVE_NOTE:
      return {
        ...state,
        [action.payload.cardType]: [
          ...state[action.payload.cardType].filter((item) => item.id !== action.payload.id),
        ],
      };
    default:
      return state;
  }
};

export default notesReducer;
