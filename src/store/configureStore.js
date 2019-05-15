import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import bookmarksReducer from './reducers/bookmarks';
import importantReducer from './reducers/important';
import unfinishedReducer from './reducers/unfinished';
import searchReducer from './reducers/search';

const rootReducer = combineReducers({
  bookmarks: bookmarksReducer,
  important: importantReducer,
  unfinished: unfinishedReducer,
  search: searchReducer
})

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;