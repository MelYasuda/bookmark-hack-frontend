export function fetchAllBookmarks() {
  return function(dispatch) {
    dispatch({
      type: 'FETCH_BOOKMARKS_REQUEST'
    });
    return fetch('/api/bookmarks/allBookmarks',{
      method: 'get',
      headers: {
        'Authorization': 'Bearer' + ' ' + window.sessionStorage.jwtToken
      }
    })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        console.log(body)
        if (!response.ok) {
          dispatch({
            type: 'FETCH_BOOKMARKS_FAILURE',
            error: body.error
          });
        } else {
          dispatch({
            type: 'FETCH_BOOKMARKS_SUCCESS',
            bookmarks: body
          });
        }
      });
  }
}