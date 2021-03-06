import {
  FETCH_SUCCESS,
  FETCH_ALL_NOTES_SUCCESS,
  CREATE_SUCCESS,
  REMOVE_SUCCESS,
  EDIT_SUCCESS,
  FETCH_ONE_SUCCESS,
  CREATE_FAILURE,
} from 'actions/notes';
import { DEAUTHENTICATE_SUCCESS } from 'actions/user';

const notesInitialState = {};

const notesReducer = (state = notesInitialState, action) => {
  const { type } = action;
  switch (type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [...action.payload.data],
      };
    case FETCH_ALL_NOTES_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [
          ...action.payload.data.ownNotes,
          ...action.payload.data.sharedNotes,
        ],
      };
    case DEAUTHENTICATE_SUCCESS:
      return {
        notesInitialState,
      };
    case FETCH_ONE_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [action.payload.data],
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
        failure: undefined,
        [action.payload.itemType]: [...state[action.payload.itemType], action.payload.item],
      };
    case CREATE_FAILURE: {
      return {
        ...state,
        failure: action.payload.err,
      };
    }
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
