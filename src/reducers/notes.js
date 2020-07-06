import {
  REMOVE_NOTE,
  CREATE_NOTE,
  // FETCH_REQUEST,
  FETCH_SUCCESS,
  // FETCH_FAILURE,
} from 'actions/notes';

const notesInitialState = {};

const notesReducer = (state = notesInitialState, action) => {
  const { type } = action;
  switch (type) {
    case FETCH_SUCCESS:
      console.log(action);
      return {
        ...state,
        [action.payload.itemType]: [...action.payload.data],
      };
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
