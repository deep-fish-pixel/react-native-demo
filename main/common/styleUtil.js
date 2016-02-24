import {Platform} from 'react-native';
import baseUtil from './baseUtil';
/*
* style处理方法
* */
var styleUtil = {
    /*
     * 适配指定平台的css对象
     * @param styleObject css对象
     * @param platform 平台的字符串标识
     * */
    adaptor: function (styleObject, platform) {
        return Platform.OS === platform?styleObject:null;
    },
    /*
     * 适配ios
     * @param styleObject css对象
     * */
    adaptorIos: function (styleObject) {
        return this.adaptor(styleObject, baseUtil.IOS);
    },
    /*
     * 适配android
     * @param styleObject css对象
     * */
    adaptorAndroid: function (styleObject) {
        return this.adaptor(styleObject, baseUtil.ANDROID);
    },
};
module.exports = styleUtil;