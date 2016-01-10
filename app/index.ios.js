'use strict';

var React = require('react-native');
var AppRegistry = React.AppRegistry;
var StyleSheet = React.StyleSheet;
var Text = React.Text;
var View = React.View;
var ListView = React.ListView;
var TouchableOpacity = React.TouchableOpacity;
var AlertIndicatorIOS = React.AlertIndicatorIOS;
var ActivityIndicatorIOS = React.ActivityIndicatorIOS;
var AlertIOS = React.AlertIOS;

var data = (function () {
    var _arr = [];
    for (var i = 0; i <= 100; i++) {
        _arr.push({
            "userId": i,
            "user": "Context",
            "blog": "http://newsai.com",
            "github": "https://github.com/newsai"
        });
    }
    return _arr;
})();

var stickyId = 3;

var contextapp = React.createClass({
    displayName: 'contextapp',

    dataBlob: {},
    sectionIDs: [],
    rowIDs: [],

    getInitialState: function getInitialState() {
        var getSectionData = function getSectionData(dataBlob, sectionID) {
            return dataBlob[sectionID];
        };

        var getRowData = function getRowData(dataBlob, sectionID, rowID) {
            return dataBlob[sectionID + ':' + rowID];
        };
        return {
            dataSource: new ListView.DataSource({
                getRowData: getRowData,
                getSectionHeaderData: getSectionData,
                rowHasChanged: function rowHasChanged(row1, row2) {
                    return row1 !== row2;
                },
                sectionHeaderHasChanged: function sectionHeaderHasChanged(s1, s2) {
                    return s1 !== s2;
                }
            })
        };
    },

    componentWillMount: function componentWillMount() {
        var res = this.listViewHandleData(data);
        console.log(res);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(res.dataBlob, res.sectionIDs, res.rowIDs),
            loaded: true
        });
    },

    listViewHandleData: function listViewHandleData(result) {
        var me = this,
            dataBlob = {},
            sectionIDs = ['s0', 's1'],
            rowIDs = [[], []],
            key,
            length = result.length,
            splitIdx;

        for (var i = 0; i < length; i++) {
            key = result[i]['userId'];
            if (key === stickyId) {
                dataBlob['s1'] = result[i];
                splitIdx = true;
            } else {
                if (splitIdx) {
                    dataBlob['s1:' + key] = result[i];
                    rowIDs[1].push(key);
                } else {
                    dataBlob['s0:' + key] = result[i];
                    rowIDs[0].push(key);
                }
            }
        }
        console.log(dataBlob, sectionIDs, rowIDs);

        return {
            dataBlob: dataBlob,
            sectionIDs: sectionIDs,
            rowIDs: rowIDs
        };
    },

    _renderRow: function _renderRow(rowData, sectionID, rowID) {
        var _this = this;

        return React.createElement(
            TouchableOpacity,
            { onPress: function () {
                    return _this.onPressRow(rowData, sectionID);
                } },
            React.createElement(
                View,
                { style: styles.rowStyle },
                React.createElement(
                    Text,
                    { style: styles.rowText },
                    rowData.userId,
                    '  ',
                    rowData.user
                )
            )
        );
    },

    onPressRow: function onPressRow(rowData, sectionID) {
        var buttons = [{
            text: 'Cancel'
        }, {
            text: 'OK'
        }];
        AlertIOS.alert('User\'s Blog is ' + rowData.blog, null, null);
    },

    renderSectionHeader: function renderSectionHeader(sectionData, sectionID) {
        if (sectionData && sectionData['userId'] === stickyId) {
            return React.createElement(
                View,
                { style: [styles.rowStyle, { backgroundColor: '#42B7F3' }] },
                React.createElement(
                    Text,
                    { style: styles.rowText },
                    sectionData.userId,
                    '  ',
                    sectionData.user,
                    ' ==> ',
                    sectionData.blog
                )
            );
        } else {
            return React.createElement(View, null);
        }
    },

    render: function render() {
        var _this2 = this;

        return React.createElement(ListView, {
            dataSource: this.state.dataSource,
            renderRow: function (rowData, sectionID, rowID, highlightRow) {
                return _this2._renderRow(rowData, sectionID, rowID, highlightRow);
            },
            renderSectionHeader: this.renderSectionHeader
        });
    }
});

var styles = StyleSheet.create({

    rowStyle: {
        paddingVertical: 20,
        paddingLeft: 16,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1
    }
});

AppRegistry.registerComponent('contextapp', function () {
    return contextapp;
});