import React, {
  StyleSheet,
  Component,
  View,
  Text,
  ListView,
  TouchableHighlight,
  AlertIOS
} from 'react-native';

import NewsArticle from './newsArticle';

var PTRView = require('react-native-pull-to-refresh');

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 14,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
  content: {
    flex: 1
  }
});

export default class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.dataBlob = {};
    this.sectionIDs = [];
    this.rowIDs = [];
    var getSectionData = (dataBlob, sectionID) => {
        return dataBlob[sectionID];
    };
    var getRowData = (dataBlob, sectionID, rowID) => {
        return dataBlob[sectionID + ':' + rowID];
    };
    this.dataSource = new ListView.DataSource({
        getRowData: getRowData,
        getSectionHeaderData: getSectionData,
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })
  }

  componentWillMount() {
    var res = this.listViewHandleData(this.props.articles);
    this.setState({
        dataSource: this.dataSource.cloneWithRowsAndSections(res.dataBlob, res.sectionIDs, res.rowIDs),
        loaded: true
    });
  }

  listViewHandleData (articles) {
      var _this4 = this;

      var data = {},
        sectionIDs = ['s0'],
        rowIDs = [[]],
        key,
        length = articles.length;
      console.log(articles);

      for (var i = 0; i < length; i++) {
          key = articles[i].name;
          data['s0:' + key] = articles[i],
          rowIDs[0].push(key);
      }

      return {
          dataBlob: data,
          sectionIDs: sectionIDs,
          rowIDs: rowIDs
      };
  }

  _handleChangePage(article) {
    this.props.navigator.push({
      title: "Article - " + article.name,
      component: NewsArticle,
      passProps: {
        article: article
      }
    });
  }

  _renderRow(article) {
      return (
        <TouchableHighlight onPress={this._handleChangePage.bind(this, article)}>
          <View style={styles.row}>
            <Text style={styles.text}>{article.name}</Text>
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      );
  }

  render() {
    const { articles, refresh, navigator } = this.props;

    return (
      <ListView
        style={styles.content}
        navigator={this.props.navigator}
        dataSource={this.state.dataSource}
        renderRow={(article, sectionID, rowID) => this._renderRow(article)}
      />
    );
  }
}