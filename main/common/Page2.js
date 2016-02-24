import React, {
    Animated,
    StyleSheet,
    ScrollView,
    Image,
    View,
    Text,
    Dimensions,
    PullToRefreshViewAndroid,
} from 'react-native';
var window = Dimensions.get('window');
var styles = require('./../style/lib/commonStyle');
var util = require('./../common/util');
var Page = React.createClass({
    getInitialState() {
        this.event = {
            offsetY: 0,
            contentHeight: window.height,
            ...window,
            init:true,
        };
        //滚动开关，默认打开
        this.scrollFlag = true;
        return {
            pageLoadingAnimateValue: new Animated.Value(0),
        };
    },
    componentDidMount() {
        if(this.needLoading()){
            this._animate();
        }
    },
    render: function() {
        util.page.setCurrentPage(this);
        //检测loading元素
        var loading = this.getLoading();
        //是否需要滚动效果
        var Element = this.isScroll()? ScrollView : View;
        //页面是否 有刷新功能并且是安卓平台的
        var androidRefresh = this.props.onRefresh && util.platform=='android';

        //封装android下拉刷新功能与ios调用相同
        if(androidRefresh){
            var refreshEndCallback = ()=>{
                this.setState({isRefreshing: false});
            }
        }
        return (
            /*
            * 属性配置说明
            * onScroll 配置是否可以滚动
            * onRefreshStart 配置是否有顶部下拉刷新功能
            * loading 配置页面加载中空页面是否 加载中图标提示
            * */
            androidRefresh?
                <PullToRefreshViewAndroid
                    style={styles.pageScene}
                    refreshing={this.state.isRefreshing||false}
                    onRefresh={()=>{
                        this.props.onRefresh(refreshEndCallback);
                    }}
                    colors={['#ff0000', '#00ff00', '#0000ff']}
                    progressBackgroundColor={'#ffff00'}
                    >
                    <Element onScroll={this.onScroll}
                             onRefreshStart={this.props.onRefresh}
                             onMomentumScrollEnd={this.onMomentumScrollEnd}
                             onScrollEndDrag={this.onScrollEndDrag}>
                        <View>
                            {loading}
                            {this.props.children}
                            {util.alertTip.render(this.event)}
                        </View>
                    </Element>
                </PullToRefreshViewAndroid>
                :
                <Element onScroll={this.onScroll}
                         onRefreshStart={this.props.onRefresh}
                         onMomentumScrollEnd={this.onMomentumScrollEnd}
                         onScrollEndDrag={this.onScrollEndDrag}
                         style={styles.pageScene}>
                    <View>
                        {loading}
                        {this.props.children}
                        <View style={[styles.validateBox,{width:this.event.width, height:this.event.contentHeight,backgroundColor:'green'}]}>
                            <View style={[styles.validateBg, {width:this.event.width, height:this.event.contentHeight,backgroundColor:'red'}]}></View>
                            <View style={[styles.flexBoxCenter, {width:window.width,}]}>
                                <View style={styles.flex}></View>
                                <View style={[
                                    styles.validateContent,
                                    {
                                        top: this.event.offsetY+this.event.height/2-30/2+(this.event.init?-20:44),
                                    }]}><Text style={styles.validateContentText}>12341234123412341234123412341234</Text>
                                                </View>
                                                <View style={styles.flex}></View>
                                </View>

                        </View>
                        {util.alertTip.render(this.event)}
                    </View>
                </Element>
        );
    },
    updateEvent: function (event) {
        this.event = {
            offsetY: event.nativeEvent.contentOffset.y,
            contentHeight: event.nativeEvent&&event.nativeEvent.contentSize.height,
            ...window,
        };
    },
    onScroll: function (event) {
        this.updateEvent(event);
        this.props.onScroll && this.props.onScroll(...arguments);
    },
    onMomentumScrollEnd: function (event) {
        this.updateEvent(event);
        this.props.onMomentumScrollEnd && this.props.onMomentumScrollEnd(...arguments);
    },
    onScrollEndDrag: function (event) {
        this.updateEvent(event);
        this.props.onScrollEndDrag && this.props.onScrollEndDrag(...arguments);
    },
    getLoading: function () {
        if(this.needLoading()){
            return (
            <View style={[styles.ajaxLoadingBox,
            styles.flexBoxCenter,
            util.windowSize]}>
                <View style={styles.pageLoadingBox}>
                    <Animated.View style={[styles.pageLoadingCircle,{transform:[{translateY: this.state.pageLoadingAnimateValue.interpolate({
                            inputRange:[0, 1],
                            outputRange:[0, 10]
                        })}],
                        backgroundColor:this.state.pageLoadingAnimateValue.interpolate({
                            inputRange:[0, 1],
                            outputRange:['#2595F5', '#2D84FD']
                        }),
                        }]}></Animated.View>
                    <Animated.View style={[styles.pageLoadingShadow,{transform:[{
                        scale:this.state.pageLoadingAnimateValue.interpolate({
                            inputRange:[0, 1],
                            outputRange:[.4, .7]
                        })}]}]}>
                    </Animated.View>
                </View>
            </View>);
        }
    },
    needLoading: function () {
        if(this.props.loading && !this.props.children){
            return true;
        }
    },
    _animate() {
        this.state.pageLoadingAnimateValue.setValue(0);
        Animated.sequence([
            Animated.timing(this.state.pageLoadingAnimateValue, {
                toValue: 1,
                duration: 300,
            }),
            Animated.timing(this.state.pageLoadingAnimateValue, {
                toValue: 0,
                duration: 300,
            })
        ]).start(this._animate);
    },
    setScroll: function (value) {
        this.scrollFlag = !!value;
        this.setState({});
    },
    isScroll: function () {
        return this.scrollFlag && this.props.scrolled!==false;
    },


});




module.exports = Page;