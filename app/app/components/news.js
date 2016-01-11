import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3
  }
});

export default class News extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { articles, refresh } = this.props;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{articles}</Text>
        <TouchableOpacity onPress={refresh} style={styles.button}>
          <Text>up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}