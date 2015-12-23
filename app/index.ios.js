/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  NavigatorIOS,
  TouchableOpacity,
} = React;

var Buttons = require('./context/buttons');

var Home = React.createClass({
  render: function () {
   return (
      <ScrollView style={styles.list}
                  contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => {
          this.props.navigator.push({
            title: 'Buttons',
            component: Buttons,
          });
        }}>
          <Text style={styles.pushLabel}>Buttons</Text>
        </TouchableOpacity>
      </ScrollView>
    );
}
});

var contextapp = React.createClass({
  render: function () {
    return (
      <NavigatorIOS
        style={{flex:1}}
        initialRoute={{
          component: Home,
          title: 'Context App',
        }}
      />
    );
  },
});

var styles = StyleSheet.create({
  list: {
    backgroundColor: '#F5FCFF',
    paddingTop: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 20, marginBottom: 0,
  },
  pushLabel: {
    padding: 10,
    color: '#2196F3',
  }
});

AppRegistry.registerComponent('contextapp', () => contextapp);
