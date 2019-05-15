export function fetchImportantBookmarks() {
  return function(dispatch) {
    dispatch({
      type: 'FETCH_IMPORTANT_BOOKMARKS_REQUEST'
    });
    return fetch('/api/bookmarks/selectImportant',{
      method: 'get',
      headers: {
        'Authorization': 'Bearer' + ' ' + window.sessionStorage.jwtToken
      }
    })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'FETCH_IMPORTANT_BOOKMARKS_FAILURE',
            error: body.error
          });
        } else {
          dispatch({
            type: 'FETCH_IMPORTANT_BOOKMARKS_SUCCESS',
            important: body
          });
        }
      });
  }
}