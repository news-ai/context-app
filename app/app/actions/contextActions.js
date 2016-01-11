import * as types from './actionTypes';

function receiveFeed(feed) {
  return {
    type: types.REFRESH,
    articles: feed.articles
  }
}

export function getFeed() {
  let contextURL = `http://172.99.68.57/api/feeds?t=${Date.now()}`;
  return dispatch => {
    fetch(contextURL, { method: "GET" }).then(function (response) {
      return response.json();
    }).then(function (responseData) {
      dispatch(receiveFeed(responseData[0]))
    }).done();
  }
}