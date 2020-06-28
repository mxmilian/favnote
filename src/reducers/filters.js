import { SET_TEXT_FILTER, SET_SORT_BY } from 'actions/filters';

const filtersInitialState = {
  text: '',
  sortBy: 'asc',
};

const filtersReducer = (state = filtersInitialState, action) => {
  const { type } = action;
  switch (type) {
    case SET_TEXT_FILTER:
      return {
        ...state,
        text: action.text,
      };
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.sortBy,
      };
    default:
      return state;
  }
};

export default filtersReducer;
