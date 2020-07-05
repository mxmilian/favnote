import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import notesReducer from 'reducers/notes';
import filterReducer from 'reducers/filters';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* eslint-disable no-underscore-dangle */
const store = createStore(
  combineReducers({
    notes: notesReducer,
    filters: filterReducer,
  }),
  composeEnhancers(applyMiddleware(thunk)),
);
/* eslint-enable */
export default store;
