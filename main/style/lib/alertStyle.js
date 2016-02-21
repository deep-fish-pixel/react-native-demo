import React, {StyleSheet} from 'react-native';
import util from './../../common/baseUtil';
import baseStyle from './baseStyle';
/*
* 页面弹框模块展示，
* 注意使用baseUtil模块，否则容易导致依赖模块嵌套问题
* */
var styles = util.create({
    alertBox:{
        borderRadius:16,
    },
    alertBtnBox: {
        /*position:'absolute',*/
        height: 46,
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopWidth:1/util.ratio,
        borderTopColor:'#ccc',
        borderBottomLeftRadius:16,
        borderBottomRightRadius:16,
    },
    alertBtnTouch: {
        height: 46,
        flex:1,
        alignItems: 'center',
        alignSelf:'center',
    },
    alertBtnTouchFirst: {
        borderBottomLeftRadius:16,
    },
    alertBtnTouchLast: {
        borderLeftWidth:1/util.ratio,
        borderLeftColor:'#ccc',
        borderBottomRightRadius:16,
    },
    alertFirstBtn: {
        fontSize:18,
        lineHeight: 31,
        color:'#3385ff',
        textAlign:'center',
    },
});
module.exports = styles;