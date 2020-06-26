import { notes, articles, twitters } from 'data/dummyData';
import { REMOVE_NOTE, CREATE_NOTE } from 'actions/notes';

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
        [action.payload.itemType]: [
          ...state[action.payload.itemType].filter((item) => item.id !== action.payload.id),
        ],
      };
    case CREATE_NOTE:
      return {
        ...state,
        [action.payload.itemType]: [...state[action.payload.itemType], action.payload.item],
      };
    default:
      return state;
  }
};

export default notesReducer;
