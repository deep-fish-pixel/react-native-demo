import React, {
    StyleSheet,
    Dimensions,
    View,
    Image,
    Text,
} from 'react-native';
import util from './baseUtil';
import ajax from './ajax';
import styles from './../style/lib/commonStyle';
/*
 * 滚动列表异步加载
 * 若该模块作为util的工具模块使用，依赖util的工具集合，则需使用baseUtil模块，
 * 而非util模块，会出现模块相互嵌套问题
 * */
var scrollAjax = function (ajaxOptions){//滚动到底部获取数据
    var steps = ajaxOptions.steps||10,
        maxRecords = ajaxOptions.maxRecords||150,
        totalFlag = ajaxOptions.totalFlag||"total",
        startFlag = ajaxOptions.startFlag||"startIndex",
        endFlag = ajaxOptions.endFlag||"endIndex",
        recordsFlag = ajaxOptions.recordsFlag||"list",
        pageIndex = ajaxOptions.pageIndex || 'pageIndex',
        pageSize = ajaxOptions.pageSize || 'pageSize',
        ts = ajaxOptions.ts || 'ts',
        busy = 0,//获取数据状态 0为空闲， 1为在获取中
        count = 0,
        totalRecords = 100,//初始化值，设置的大一些以通过后续检测
        startFetch = ajaxOptions.startFetch === undefined ? true : !!ajaxOptions.startFetch,
        totalList = [],
        xhr,
        self = this;
    ajaxOptions.data = ajaxOptions.data||{};
    getData();

    function getData(callback){
        if(busy || !startFetch)return;
        var options = ajaxOptions, data = options.data;
        data[startFlag] = ++count;
        if(totalRecords < data[startFlag]){//起始下标大于总数返回
            --count;
            return;
        }
        data[pageSize] = steps;
        data[pageIndex] = Math.ceil(count/steps);
        data[endFlag] = (count+=steps-1);
        data[ts] = new Date().getTime();
        if(totalRecords < data[endFlag]){//总数小于结束下标
            data[endFlag] = totalRecords;
        }
        busy = true;
        xhr = ajax({
            url:options.url,
            type: options.type||"GET",
            data: data ||{},
            dataType: "json",
            success: function(data){
                handleSuccess(data);
                callback && callback(data);
            },
            error: function(){
                busy = false;
                count -= steps;
                callback && callback(data);
            }
        });
    }
    function handleSuccess(json){
        //alert(JSON.stringify(json));
        if(json){
            if(totalRecords = (json[totalFlag] > maxRecords?maxRecords:json[totalFlag])){
                var list = json[recordsFlag];
                //alert(JSON.stringify(list));
                if(list && list.length>0){
                    totalList = totalList.concat(list);
                    if(ajaxOptions.handleData){
                        list.forEach(function (value, i) {
                            ajaxOptions.handleData(list[i], i);
                        });
                    }
                    if(ajaxOptions.success)ajaxOptions.success(list, totalList, ajaxOptions);
                }

                if(totalRecords <= ajaxOptions.data[endFlag]){
                    if(ajaxOptions.component && ajaxOptions.component.forceUpdate){
                        ajaxOptions.component.forceUpdate();
                    }
                    if(ajaxOptions.end) {
                        var loadEndFlag = maxRecords && maxRecords <= json[totalFlag] && count >= maxRecords;
                        ajaxOptions.end(list, totalList, ajaxOptions, loadEndFlag);
                    }
                }
            }
            else if(ajaxOptions.zero){//无列表数据回调ajaxOptions.zero方法
                ajaxOptions.zero(list, totalList, ajaxOptions);
                return;
            }
        }
        //一次获取数据没有满屏继续,此时需要1个延迟加载dom的时间
        busy = false;
    }

    return {
        start: function(){
            startFetch = true;
        },
        close: function(){
            startFetch = false;
        },
        get: function(event, callback){
            if(event && util.isBottom(event) || !event){
                getData(callback);
            }
        },
        reset: function () {
            this.abort();
            count = 0;
            startFetch = true;
            totalList = [];
        },
        refresh: function (callback) {
            this.reset();
            this.get(null, callback);
        },
        abort:function(){
            if(this.xhr){
                this.xhr.abort();
            };
            if(count){
                count--;
            }
        },
        isContinue: function () {
            if(totalRecords <= ajaxOptions.data[endFlag])return false;
            if(busy || startFetch)return true;
        },
        getLoading: function () {
            //alert(styles.flexBoxCenter);
            if(this.isContinue()){
                return (
                    <View style={[styles.ajaxLoadingBox, styles.flexBoxCenter]}>
                        <Image style={[styles.ajaxLoadingCircle]} source={require('./../style/image/loading.gif')}></Image>
                        <Text style={[styles.ajaxLoadingText]}>加载中...</Text>
                    </View>);
            }
            else{
                /*alert(totalRecords +' '
                    + ajaxOptions.data[startFlag] +' '
                    + ajaxOptions.data[endFlag]
                    +' ' + busy +' '
                    +' ' + startFetch +' ');*/
            }
        },
    }
}
module.exports = scrollAjax;