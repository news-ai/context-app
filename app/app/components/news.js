import React, {
  StyleSheet,
  Component,
  View,
  Text,
  ListView,
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
  },
  rowStyle: {
     paddingVertical: 20,
     paddingLeft: 16,
     borderBottomColor: '#E0E0E0',
     borderBottomWidth: 1
  }
});

export default class News extends React.Component {
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

  _renderRow(rowData, sectionID, rowID) {
      return (
          <TouchableOpacity>
              <View style={styles.rowStyle}>
                  <Text style={styles.rowText}>{rowData}</Text>
              </View>
          </TouchableOpacity>
      );
  }

  render() {
    const { articles, refresh } = this.props;

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData, sectionID, rowID, highlightRow) => this._renderRow(rowData, sectionID, rowID, highlightRow)}
      />
    );
  }
}