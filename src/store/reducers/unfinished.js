
const INITIAL_STATE = {
  unfinished: [],
  isLoading: false,
  error: undefined
};

function unfinishedReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_UNFINISHED_BOOKMARKS_REQUEST':
      return Object.assign({}, state, {
        isLoading: true
      });
    case 'FETCH_UNFINISHED_BOOKMARKS_SUCCESS':
      return Object.assign({}, state, {
        isLoading: false,
        unfinished: action.unfinished
      });
    case 'FETCH_UNFINISHED_BOOKMARKS_FAILURE':
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    default:
      return state;
  }
}

export default unfinishedReducer;