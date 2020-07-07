import {
  // FETCH_REQUEST,
  FETCH_SUCCESS,
  // FETCH_FAILURE,
  // CREATE_REQUEST,
  CREATE_SUCCESS,
  // CREATE_FAILURE,
  // REMOVE_REQUEST
  REMOVE_SUCCESS,
  // REMOVE_FAILURE
} from 'actions/notes';

const notesInitialState = {};

const notesReducer = (state = notesInitialState, action) => {
  const { type } = action;
  switch (type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [...action.payload.data],
      };
    case REMOVE_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType].filter(({ _id: id }) => id !== action.payload.id),
        ],
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [...state[action.payload.itemType], action.payload.item],
      };
    default:
      return state;
  }
};

export default notesReducer;
