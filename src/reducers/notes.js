import { FETCH_SUCCESS, CREATE_SUCCESS, REMOVE_SUCCESS, EDIT_SUCCESS } from 'actions/notes';

const notesInitialState = {};

const notesReducer = (state = notesInitialState, action) => {
  const { type } = action;
  switch (type) {
    case FETCH_SUCCESS:
      console.log(state);
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
    case EDIT_SUCCESS:
      console.log(state);
      console.log('XD');
      return {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType].map((el) => {
            // eslint-disable-next-line no-underscore-dangle
            if (el._id === action.payload.data._id) {
              console.log(el);
              console.log(action.payload.data);
              console.log({ ...el, ...action.payload.data });
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
