/*
 *
 *
 * */
import util from './../util';
var navigationManage = {
    /*
    * 当前导航组件计入数组缓存
    * */
    navigators:[],
    /*
     * 导航组件新建加入
     * */
    push: function (nav) {
        this.navigators.push(nav);
    },
    /*
     * 移除导航组件时清空
     * */
    pop: function () {
        return this.navigators.pop();
    },
    /*
     * 获取最新组件
     * */
    getNavigator: function () {
        return this.navigators[this.navigators.length-1];
    }

}
module.exports = navigationManage;