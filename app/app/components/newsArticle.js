import React, {
  StyleSheet,
  Component,
  View,
  Text,
  ListView,
  TouchableHighlight,
  AlertIOS
} from 'react-native';

export default class NewsArticle extends React.Component {
  render() {
    const { article } = this.props;
    return (
      <View>
        <Text>{ article.name }</Text>
      </View>
    );
  }
}
