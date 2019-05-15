const INITIAL_STATE = {
  important: [],
  isLoading: false,
  error: undefined
};

function importantReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_IMPORTANT_BOOKMARKS_REQUEST':
      return Object.assign({}, state, {
        isLoading: true
      });
    case 'FETCH_IMPORTANT_BOOKMARKS_SUCCESS':
      return Object.assign({}, state, {
        isLoading: false,
        important: action.important
      });
    case 'FETCH_IMPORTANT_BOOKMARKS_FAILURE':
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    default:
      return state;
  }
}

export default importantReducer;