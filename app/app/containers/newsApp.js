'use strict';

import React, { Component, View, Text } from 'react-native';
import {bindActionCreators} from 'redux';
import News from '../components/news';
import * as counterActions from '../actions/contextActions';
import { connect } from 'react-redux';

class NewsApp extends Component {
  constructor(props) {
    super(props);
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
      <News
        articles={state.articles}
        {...bindActionCreators(counterActions, dispatch)} />
    );
  }
}

export default connect(state => ({
  state: state.context
}))(NewsApp);