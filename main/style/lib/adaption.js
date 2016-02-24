import React from 'react-native';
/*
* 兼容模块定义
* */
var ios = React.Platform.OS==='ios';

var styles = {
    textAlign: ios?{
        textAlign: 'center'
    }:null,

};
module.exports = styles;