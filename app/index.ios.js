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
            }),
            isLoading: true
        };
    },

    componentWillMount: function componentWillMount() {
        var _this3 = this;

        fetch("http://172.99.68.57/api/feeds", { method: "GET" }).then(function (response) {
            return response.json();
        }).then(function (responseData) {
            var res = _this3.listViewHandleData(responseData[0]);
            _this3.setState({
                dataSource: _this3.state.dataSource.cloneWithRowsAndSections(res.dataBlob, res.sectionIDs, res.rowIDs),
                loaded: true
            });
        }).done();
    },

    listViewHandleData: function listViewHandleData(result) {
        var _this4 = this;

        var data = {},
            sectionIDs = ['s0', 's1'],
            rowIDs = [[], []],
            key,
            length = result.articles.length;

        for (var i = 0; i < length; i++) {
            key = result.articles[i];
            rowIDs[0].push(key);
            fetch("http://172.99.68.57/api/articles/" + key, { method: "GET" }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                data['s0:' + key] = responseData.name;
            }).done(function (response) {
                if (Object.keys(data).length >= length) {
                    _this4.setState({
                        isLoading: false
                    });
                }
            });
        }

        return {
            dataBlob: data,
            sectionIDs: sectionIDs,
            rowIDs: rowIDs
        };
    },

    _renderRow: function _renderRow(rowData, sectionID, rowID) {
        var _this = this;

        return React.createElement(TouchableOpacity, { onPress: function onPress() {} }, React.createElement(View, { style: styles.rowStyle }, React.createElement(Text, { style: styles.rowText }, rowData)));
    },

    render: function render() {
        var _this2 = this;

        if (this.state.isLoading) {
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

        return React.createElement(ListView, {
            dataSource: this.state.dataSource,
            renderRow: function renderRow(rowData, sectionID, rowID, highlightRow) {
                return _this2._renderRow(rowData);
            }
        });
    }
});

var styles = StyleSheet.create({

    rowStyle: {
        paddingVertical: 20,
        paddingLeft: 16,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        height: 60,
        flexDirection: 'row'
    }
});

AppRegistry.registerComponent('contextapp', function () {
    return contextapp;
});