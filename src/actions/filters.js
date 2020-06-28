export const SET_TEXT_FILTER = 'SET_TEXT_FILTER';
export const SET_SORT_BY = 'SET_SORT_BY';

export const setTextFilter = (text) => ({
  type: SET_TEXT_FILTER,
  text,
});

export const setSortBy = (sortBy) => ({
  type: SET_SORT_BY,
  sortBy,
});
