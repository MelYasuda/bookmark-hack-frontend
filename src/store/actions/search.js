export function fetchSearchBookmarks(tags) {
  console.log(tags)
  return function(dispatch) {
    dispatch({
      type: 'FETCH_SEARCH_BOOKMARKS_REQUEST'
    });
    return fetch('/api/bookmarks/search', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + window.sessionStorage.jwtToken
      },
      body: JSON.stringify(tags)
      }
    ).then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        console.log(body)
        if (!response.ok) {
          dispatch({
            type: 'FETCH_SEARCH_BOOKMARKS_FAILURE',
            error: body.error
          });
        } else {
          dispatch({
            type: 'FETCH_SEARCH_BOOKMARKS_SUCCESS',
            search: body
          });
        }
      });
  }
}


// const search = this.props.location.search.substring(1);
// const values = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })

// response = await fetch('/api/bookmarks/search', {
//   method: 'post',
//   headers: {
//     'Accept': 'application/json, text/plain, */*',
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer' + ' ' + window.sessionStorage.jwtToken
//   },
//   body: JSON.stringify(values)
//   }
// )