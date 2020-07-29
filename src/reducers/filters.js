import { SET_TEXT_FILTER, SET_SORT_BY, SET_SHARED } from 'actions/filters';

const filtersInitialState = {
  text: '',
  sortBy: 'asc',
  shared: false,
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
    case SET_SHARED:
      return {
        ...state,
        shared: action.shared,
      };
    default:
      return state;
  }
};

export default filtersReducer;
