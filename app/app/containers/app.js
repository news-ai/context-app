import React, { Component, StyleSheet, View, Text, NavigatorIOS } from 'react-native';

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

var styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#0D5480',
        paddingTop: 30,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    toolbarButton: {
        width: 50,
        color: '#fff',
        textAlign: 'center'
    },
    toolbarTitle: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1
    },
    mainContainer: {
        flex: 1
    },
    content: {
        flex: 1,
        marginTop: 0
    },
    navigationContainer: {
        flex: 1
    }
});

export default class ContextApp extends Component {
  render() {
    return (
        <Provider store={store}>
            <View style={styles.mainContainer}>
                <View style={styles.toolbar}>
                    <Text style={styles.toolbarTitle}>Context</Text>
                </View>
                <View style={styles.content}>
                    <NavigatorIOS
                        style={styles.navigationContainer}
                        navigationBarHidden={true}
                        initialRoute={{
                            title: "NewsAI Home",
                            component: NewsApp,
                        }}/>
                </View>
            </View>
        </Provider>
    );
  }
}