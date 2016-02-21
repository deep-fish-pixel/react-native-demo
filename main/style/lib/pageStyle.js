import React, {StyleSheet} from 'react-native';
import util from './../../common/baseUtil';
/*
* 页面loading模块展示，
* 注意使用baseUtil模块，否则容易导致依赖模块嵌套问题
* */
var styles = util.create({
    pageLoadingBox: {
        backgroundColor:'rgba(0,0,0,.6)',
        height: 40,
        width:40,
        borderRadius: 3,
        alignItems: 'center',
        marginTop: -100,
    },
    pageLoadingCircle: {
        width:16,
        height:16,
        backgroundColor:'#2595F5',
        borderRadius:8,
        marginTop: 4,
    },
    pageLoadingShadow: {
        width:20,
        height:3,
        backgroundColor:'rgba(255, 140, 78, .8)',
        borderRadius:10,
        marginTop: 13,
    },
    pageScene:{
        flex: 1,
        marginTop: util.platform=='ios'?64:54,
        backgroundColor: '#f2f2f2',
    },
});
module.exports = styles;