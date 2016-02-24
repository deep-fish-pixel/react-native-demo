import React, {StyleSheet} from 'react-native';
import util from './../../common/baseUtil';
/*
* 验证模块展示，
* 注意使用baseUtil模块，否则容易导致依赖模块嵌套问题
* */
var styles = util.create({
    validateBox:{
        position: 'absolute',
        top:0,
        backgroundColor:'rgba(0,0,0,0)',
    },
    validateBg: {
        backgroundColor:'rgba(0,0,0,0)',
        position: 'absolute',
    },
    validateContent: {
        backgroundColor:'rgba(0,0,0,.7)',
        borderRadius:4,
        padding:8,
        paddingLeft:12,
        paddingRight:12,
        alignItems: 'center',
    },
    validateContentText: {
        color:'#fff',
    },
});
module.exports = styles;