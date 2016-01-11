import * as types from '../actions/actionTypes';

const initialState = {
  articles: [],
  isLoading: true
};

export default function context(state = initialState, action = {}) {
  switch (action.type) {
    case types.REFRESH:
      return {
        ...state,
        isLoading: false,
        articles: action.articles
      }
    default:
      return state;
  }
}