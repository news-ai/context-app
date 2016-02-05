'use strict';

import React, { Component, View, Text } from 'react-native';
import {bindActionCreators} from 'redux';
import NewsFeed from '../components/news';
import * as counterActions from '../actions/contextActions';
import { connect } from 'react-redux';
import PTRView from 'react-native-pull-to-refresh';

class NewsApp extends Component {
  constructor(props) {
    super(props);
  }

  _refresh () {
    return new Promise((resolve) => {
      setTimeout(()=>{resolve()}, 2000)
    });
  }

  render() {
    const { state, dispatch } = this.props;

    if (state.isLoading) {
        return React.createElement(
            View,
            null,
            React.createElement(
                Text,
                null,
                'Loading...'
            )
        );
    }

    return (
      <PTRView onRefresh={this._refresh}>
        <NewsFeed articles={state.articles}
          {...bindActionCreators(counterActions, dispatch)}
        />
      </PTRView>
    );
  }
}

export default connect(state => ({
  state: state.context
}))(NewsApp);