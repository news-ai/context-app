import React, {
  StyleSheet,
  Component,
  View,
  Text,
  ListView,
  TouchableHighlight,
  AlertIOS
} from 'react-native';

var PTRView = require('react-native-pull-to-refresh')

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
        dataSource: this.dataSource.cloneWithRowsAndSections(res.dataBlob,res.sectionIDs,res.rowIDs),
        loaded: true
    });
  }

  listViewHandleData (articles) {
      var _this4 = this;

      var data = {},
          sectionIDs = ['s0', 's1'],
          rowIDs = [[], []],
          key,
          length = articles.length;

      for (var i = 0; i < length; i++) {
          key = articles[i].name;
          data['s0:' + key] = key;
          rowIDs[0].push(key);
      }

      return {
          dataBlob: data,
          sectionIDs: sectionIDs,
          rowIDs: rowIDs
      };
  }

  onSubmitPressed() {
      
  }

  _renderRow(rowData, sectionID, rowID) {
      return (
          <TouchableHighlight onPress={(this.onSubmitPressed.bind(this))}>
            <View style={styles.row}>
                <Text style={styles.text}>{rowData}</Text>
                <View style={styles.separator} />
            </View>
          </TouchableHighlight>
      );
  }

  render() {
    const { articles, refresh } = this.props;

    return (
      <ListView
        style={styles.content}
        dataSource={this.state.dataSource}
        renderRow={(rowData, sectionID, rowID, highlightRow) => this._renderRow(rowData, sectionID, rowID, highlightRow)}
      />
    );
  }
}