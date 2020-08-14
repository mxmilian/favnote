import {
  FETCH_SUCCESS,
  FETCH_FRIENDS_NOTES_SUCCESS,
  CREATE_SUCCESS,
  REMOVE_SUCCESS,
  EDIT_SUCCESS,
  FETCH_ONE_SUCCESS,
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
    case FETCH_FRIENDS_NOTES_SUCCESS:
      console.log(action.payload.itemType);
      console.log(action.payload.data);
      return {
        ...state,
        [action.payload.itemType]: [
          ...action.payload.data.ownNotes,
          ...action.payload.data.sharedNotes,
        ],
      };
    case FETCH_ONE_SUCCESS:
      return state;
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
    case EDIT_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType].map((el) => {
            // eslint-disable-next-line no-underscore-dangle
            if (el._id === action.payload.data._id) {
              return { ...el, ...action.payload.data };
            }
            return el;
          }),
        ],
      };
    default:
      return state;
  }
};

export default notesReducer;
