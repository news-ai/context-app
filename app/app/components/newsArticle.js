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
    const { newsId } = this.props;
    return (
      <View>
        <Text>{newsId}</Text>
      </View>
    );
  }
}
