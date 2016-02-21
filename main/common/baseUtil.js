import React, {
    Dimensions,
    StyleSheet,
    PixelRatio,
    Platform,
} from 'react-native';
/*
* 最基本的工具集合, 基本要求是 最多是依赖react-native，不依赖其他的库
* */
var window = Dimensions.get('window');
var baseUtil = {
    /*
    * Platform平台信息
    * */
    platform: React.Platform.OS,
    /*
     * 包含 width、height、scale、fontScale信息
     * */
    window,
    /*
     * 只包含 width、height信息
     * */
    windowSize: {
        width: window.width,
        height: window.height,
    },
    /*
     * ratio屏幕的值
     * */
    ratio: PixelRatio.get(),
    /*
    * 复制对象的属性值，对Object.assign的对象的扩展
    * */
    assign: function (target, ...objects) {
        objects.forEach(function (object) {
            if(object){
                Object.keys(object).forEach(function(name) {
                    var target2 = target[name];
                    if(!target2){
                        target2 = target[name] = {};
                    }
                    Object.assign(target2, object[name]);
                })
            }
        });
        return target;
    },

    /*
     * 克隆并产生新对象
     * */
    clone: function (...targets) {
        return this.assign({}, ...targets)
    },
    /*
    * 对StyleSheet.create进行扩展
    * */
    create: function (...targets) {
        var types = '', self = '__object__';
        targets = targets.map(function (value) {
            if(value && value[self]){
                return value[self];
            }
            return value;
        });

        var object = this.clone(...targets)
        var styles = StyleSheet.create(object);
        styles[self] = object;
        return styles;
    },
    /*
    * 根据ScrollView的滚动事件的对象判断是否滚动到底部
    * */
    isBottom: function (event) {
        var offsetY = event && event.nativeEvent
                && event.nativeEvent.contentOffset.y||0,
            winHeight = this.window.height,
            contentHeight = event && event.nativeEvent&&event.nativeEvent.contentSize.height||winHeight;
        if(winHeight + offsetY + 100 > contentHeight){
            return true
        }
        return false;
    },
    /*
     * 延迟执行
     * @param {Function} func 回调
     * @param {number} time 延迟时间(ms)
     * @param {Date} start 起始时间
     * */
    delay: function (func, time, start) {
        var list = [];
        function add(func, time, start){
            list.push({
                func: func,
                getTime: function(){
                    var cur = new Date();
                    start = start || cur;
                    return time + (start - cur);
                }
            });
        }
        function exec(){
            var first = list.shift();
            if(first){
                var time = first.getTime();
                time = time<0?0:time;
                setTimeout(function () {
                    first.func();
                    exec();
                }, time)
            }
        }
        add(func, time, start);
        exec();
        return {
            delay: function(func, time, start){
                add(func, time, start);
            }
        }
    }
};
module.exports = baseUtil;