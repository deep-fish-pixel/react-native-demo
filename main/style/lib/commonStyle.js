import React, {StyleSheet} from 'react-native';
import util from './../../common/baseUtil';
import baseStyle from './baseStyle';
import loadingStyle from './loadingStyle';
import pageStyle from './pageStyle.js';
import validateStyle from './validateStyle.js';
/*
* 基本和模块样式的集合
* */
var commonStyle = util.create(
    /*
    * 基本样式库
    * */
    baseStyle,
    /*
     * 加载loading模块样式库
     * */
    loadingStyle,
    /*
     * 页面加载loading模块样式库
     * */
    pageStyle,
    /*
     * 验证模块样式库
     * */
    validateStyle
);
module.exports = commonStyle;