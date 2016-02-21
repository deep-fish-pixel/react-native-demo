import baseUtil from './baseUtil';
/*
* 公共配置项
* */
var config = {
    //页面切换的动画时间 单位ms
    pageTransitionTime: baseUtil.platform=='ios'?600:500,
}
module.exports = config;