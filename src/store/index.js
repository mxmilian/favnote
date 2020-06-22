import { createStore, combineReducers } from 'redux';
import notesReducer from 'reducers/notes';
import filterReducer from 'reducers/filters';

const store = createStore(
  combineReducers({
    notes: notesReducer,
    filters: filterReducer,
  }),
);

export default store;
