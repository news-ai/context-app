import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import NewsApp from './newsApp';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

import { getFeed } from '../actions/contextActions'
store.dispatch(getFeed())

export default class ContextApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <NewsApp />
      </Provider>
    );
  }
}