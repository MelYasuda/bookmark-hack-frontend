
const INITIAL_STATE = {
  bookmarks: [],
  isLoading: false,
  error: undefined
};

function bookmarksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_BOOKMARKS_REQUEST':
      return Object.assign({}, state, {
        isLoading: true
      });
    case 'FETCH_BOOKMARKS_SUCCESS':
      return Object.assign({}, state, {
        isLoading: false,
        bookmarks: action.bookmarks
      });
    case 'FETCH_BOOKMARKS_FAILURE':
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    default:
      return state;
  }
}

export default bookmarksReducer;