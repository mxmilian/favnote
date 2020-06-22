import { SET_TEXT_FILTER } from 'actions/filters';

const filtersInitialState = {
  text: '',
};

const filtersReducer = (state = filtersInitialState, action) => {
  const { type } = action;
  switch (type) {
    case SET_TEXT_FILTER:
      return {
        ...state,
        text: action.text,
      };
    default:
      return state;
  }
};

export default filtersReducer;
