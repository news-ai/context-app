import * as types from './actionTypes';

function receiveFeed(feed) {
  return {
    type: types.REFRESH,
    articles: feed.articles
  }
}

export function getFeed() {
  let contextURL = `https://context.newsai.org/api/feeds`;
  return dispatch => {
    fetch(contextURL, { method: "GET" }).then(function (response) {
      return response.json();
    }).then(function (responseData) {
      if (responseData.results && responseData.results.length > 0){
        dispatch(receiveFeed(responseData.results[0]))
      }
    }).done();
  }
}