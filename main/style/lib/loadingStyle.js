import React, {StyleSheet} from 'react-native';
import util from './../../common/baseUtil';
/*
* loading模块展示，
* 注意使用baseUtil模块，否则容易导致依赖模块嵌套问题
* */
var styles = util.create({
    ajaxLoadingBox: {
        height:40,
        alignItems: 'center',
    },
    ajaxLoadingCircle: {
        width:20,
        height:20,
    },
    ajaxLoadingText: {
        width:60,
        height:20,
        lineHeight:18,
        textAlign: 'center',
        color:'#333',
    },
});
module.exports = styles;