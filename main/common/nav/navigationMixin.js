/*
 *
 *
 * */
import React from 'react-native';
import util from './../util';
var navigationMixin = {
    components:{},
    /*
     * 导航添加组件
     * */
    push: function (options={
            id:'',
            title:'',
            component:null,
        }) {
        this.components[options.id] = options;
        if(this.navigator){
            this.navigator.push(options);
        }
    },
    renderScene: function (route, navigator) {
        this.navigator = navigator;
        var route = this.components[route.id];
        return (<route.component/>);
    },
    /*
     * 导航组件新建加入
     * */
    componentWillMount: function () {
        util.navigation.push(this);
    },
    /*
     * 移除导航组件时清空
     * */
    componentWillUnmount: function () {
        util.navigation.pop();
    },

}
module.exports = navigationMixin;