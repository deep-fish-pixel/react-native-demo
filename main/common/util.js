import baseUtil from './baseUtil';
import ajax from './ajax';
import scrollAjax from './scrollAjax';
import Validate from './Validate';
import alertTip from './alertTip';
import page from './pageUtil';
import navigation from './nav/navigationManage';
import config from './config';
/*
* 对外输出公共的工具库
* */
var util = {
    /*
    * 最基本的工具
    * */
    ...baseUtil,
    /*
     * 异步获取数据方法
     * */
    ajax,
    /*
     * 列表分步异步获取
     * */
    scrollAjax,
    /*
     * 验证模块
     * */
    Validate,
    /*
     * 提示模块
     * */
    alertTip,
    /*
     * page管理模块
     * */
    page,
    /*
     * navigation管理模块
     * */
    navigation,
    /*
     * 公共配置项
     * */
    config,
};
module.exports = util;