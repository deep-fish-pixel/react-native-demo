import React, {
    StyleSheet,
    Dimensions,
    Component,
    View,
    Image,
    Text,
} from 'react-native';
import util from './util';
import styles from './../style/baseStyle';
class ScrollAjax extends Component {
    constructor(){
        super();
    }
    componentWillMount(){
        this.initOptions();
        this.getData();
    }
    render ()  {
        return (
            <View style={[styles.ajaxLoadingBox, styles.flexBoxCenter]}>
                <Image style={[styles.ajaxLoadingCircle]} source={require('./../style/image/loading.gif')}></Image>
                <Text style={[styles.ajaxLoadingText]}>加载中...</Text>
            </View>);
    }
    initOptions(){
        this._options = Object.assign({
            steps: 10,
            maxRecords: 150,
            totalFlag: 'total',
            startFlag: 'startIndex',
            endFlag: 'endIndex',
            recordsFlag: 'list',
            pageIndex: 'pageIndex',
            pageSize: 'pageSize',
            ts: 'ts',
            busy: 0,//获取数据状态 0为空闲， 1为在获取中
            count: 0,
            totalRecords: 10 || this.props.options.steps,
            startFetch: true,
            steps: 10,
            xhr: null,
            data: {},
            totalList: [],
        }, this.props.options);
    }
    getData (){
        var options = this._options,
            data = options.data,
            busy = options.busy,
            startFetch = options.startFetch,
            startFlag = options.startFlag,
            totalRecords = options.totalRecords,
            endFlag = options.endFlag,
            steps = options.steps;
        if(busy || !startFetch)return;
        data[startFlag] = ++options.count;
        if(totalRecords < data[startFlag]){//起始下标大于总数返回
            --options.count;
            return;
        }
        alert('getData start');
        data[options.pageSize] = steps;
        data[options.pageIndex] = Math.ceil(options.count/steps);
        data[endFlag] = (options.count += steps-1);
        data[options.ts] = new Date().getTime();
        if(totalRecords < data[endFlag]){//总数小于结束下标
            data[endFlag] = totalRecords;
        }
        options.busy = true;
        options.xhr = util.ajax({
            url: options.url,
            type: options.type||"GET",
            data: data ||{},
            dataType: "json",
            success: (data)=>this.handleSuccess(data),
            error: ()=>{
                options.busy = false;
                options.count -= steps;
            }
        });
    }

    handleSuccess(json){
        var options = this._options,
            totalFlag = options.totalFlag,
            maxRecords = options.maxRecords,
            recordsFlag = options.recordsFlag,
            totalList = options.totalList,
            totalRecords = options.totalRecords,
            endFlag = options.endFlag;
        if(json){
            if(totalRecords = (json[totalFlag] > maxRecords?maxRecords:json[totalFlag])){
                var list = json[recordsFlag];
                if(list && list.length>0){
                    totalList = totalList.concat(list);
                    if(options.handleData){
                        list.forEach(function (value, i) {
                            options.handleData(list[i], i);
                        });
                    }
                    var success = options.success;
                    if(success)success(list, totalList, options);
                }

                if(totalRecords <= options.data[endFlag]){
                    var component = options.component,
                        end = options.end;
                    if(component && component.forceUpdate){
                        component.forceUpdate();
                    }
                    if(end) {
                        var loadEndFlag = maxRecords
                            && maxRecords <= json[totalFlag]
                            && options.count >= maxRecords;
                        end(list, totalList, options, loadEndFlag);
                    }
                }
            }
            else if(options.zero){//无列表数据回调ajaxOptions.zero方法
                options.zero([], totalList, options);
                return;
            }
        }
        //一次获取数据没有满屏继续,此时需要1个延迟加载dom的时间
        options.busy = false;
    }
    start(){
        this._options.startFetch = true;
    }
    close(){
        this._options.startFetch = false;
    }
    get(event){
        if(event && util.isBottom(event) || !event){
            this.getData();
        }
    }
    reset () {
        this.abort();
        var options = this._options;
        options.count = 0;
        options.startFetch = true;
        options.totalList = [];
    }
    abort(){
        var options = this._options;
        if(options.xhr){
            options.xhr.abort();
        };
        if(options.count){
            options.count--;
        }
    }
    isContinue () {
        var options = this._options,
            totalRecords = options.totalRecords;
        if(totalRecords < options.data[options.startFlag]
            || totalRecords <= options.data[options.endFlag])return false;
        if(options.busy || !options.startFetch)return true;
    }
    getLoading () {
        if(this.isContinue()){
            return (
                <View style={[styles.ajaxLoadingBox, styles.flexBoxCenter]}>
                    <Image style={[styles.ajaxLoadingCircle]} source={require('./../style/image/loading.gif')}></Image>
                    <Text style={[styles.ajaxLoadingText]}>加载中...</Text>
                </View>);
        }
        else{

            return <View></View>;
        }
    }
};
module.exports = ScrollAjax;