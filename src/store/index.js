import { createStore, combineReducers } from 'redux';
import notesReducer from 'reducers/notes';
import filterReducer from 'reducers/filters';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  combineReducers({
    notes: notesReducer,
    filters: filterReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */
export default store;
