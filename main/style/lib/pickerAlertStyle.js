import React, {StyleSheet} from 'react-native';
import util from './../../common/baseUtil';
import alertStyle from './alertStyle';
/*
* 验证模块展示，
* 注意使用baseUtil模块，否则容易导致依赖模块嵌套问题
* */
var styles = util.create(alertStyle, {
    validateBox:{
        position: 'absolute',
        top:0,
        backgroundColor:'rgba(0,0,0,0)',
    },
    validateBg: {
        backgroundColor:'rgba(0,0,0,.4)',
        position: 'absolute',
    },
    pickerContent: {
        backgroundColor:'rgba(255,255,255,.98)',
        height:206,
        left:15,
        position:"absolute",
    },
    picker: {
        marginTop:-20,
        paddingLeft:10,
        paddingRight:10,
        height:180,
    },

});
module.exports = styles;