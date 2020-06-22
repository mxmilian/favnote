const filtersInitialState = {
  text: '',
};

const filtersReducer = (state = filtersInitialState, action) => {
  console.log(state, action);
  return state;
};

export default filtersReducer;
