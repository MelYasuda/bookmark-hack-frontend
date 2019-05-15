const INITIAL_STATE = {
  search: [],
  isLoading: false,
  error: undefined
};

function searchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_SEARCH_BOOKMARKS_REQUEST':
      return Object.assign({}, state, {
        isLoading: true
      });
    case 'FETCH_SEARCH_BOOKMARKS_SUCCESS':
      return Object.assign({}, state, {
        isLoading: false,
        search: action.search
      });
    case 'FETCH_SEARCH_BOOKMARKS_FAILURE':
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    default:
      return state;
  }
}

export default searchReducer;