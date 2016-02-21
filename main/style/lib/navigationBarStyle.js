import React, {StyleSheet} from 'react-native';
import util from './../../common/baseUtil';

var cssVar = require('cssVar');
/*
* 导航naviation模块展示，
* 注意使用baseUtil模块，否则容易导致依赖模块嵌套问题
* */
var styles = util.create({
    messageText: {
        fontSize: 17,
        fontWeight: '500',
        padding: 15,
        marginTop: 50,
        marginLeft: 15,
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: 1 / util.ratio,
        borderBottomColor: '#CDCDCD',
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '500',
    },
    navBar: {
        backgroundColor: '#fff',
        borderBottomWidth: 1 / util.ratio,
        borderBottomColor:'#999',
    },
    navBarText: {
        fontSize: 16,
        marginVertical: 15,
    },
    navBarTitleText: {
        color: cssVar('fbui-bluegray-60'),
        fontWeight: '500',
        marginVertical: 15,
        width:util.window.width-120,
        textAlign:'center',

    },
    navBarLeftButton: {
        paddingLeft: 10,
    },
    navBarRightButton: {
        paddingRight: 10,
    },
    navBarButtonText: {
        color: cssVar('fbui-accent-blue'),
    },
});
module.exports = styles;