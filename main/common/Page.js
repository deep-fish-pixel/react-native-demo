import React, {
    Animated,
    StyleSheet,
    ScrollView,
    Image,
    View,
    Text,
    Dimensions,
    Touchable,
    RefreshControl,
    PullToRefreshViewAndroid,
} from 'react-native';
console.log(Touchable);
var window = Dimensions.get('window');
var styles = require('./../style/lib/commonStyle');
var util = require('./../common/util');
var Page = React.createClass({
    mixins:[Touchable],

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
            scrollEnabled: true,
            isRefreshing: false,
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
        //页面是否 有刷新功能并且是安卓平台的
        var refresh = !!this.props.onRefresh;

        //封装刷新功能
        if(refresh){
            var refreshEndCallback = ()=>this.setState({isRefreshing: false})
        }
        var hasContent = util.alertTip.hasContent();
        return (
            /*
            * 属性配置说明
            * onScroll 配置是否可以滚动
            * onRefreshStart 配置是否有顶部下拉刷新功能
            * loading 配置页面加载中空页面是否 加载中图标提示
            * */
            <ScrollView key="scrollViewRoot"
                        onScroll={this.onScroll}
                        refreshControl={
                          refresh?<RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={()=>{
                                this.setState({isRefreshing: true});
                                this.props.onRefresh(refreshEndCallback);
                            }}
                            tintColor="#ff0000"
                            title="加载..."
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                          />:null
                        }
                     onMomentumScrollEnd={this.onMomentumScrollEnd}
                     onScrollEndDrag={this.onScrollEndDrag}
                     scrollEnabled = {!hasContent && this.state.scrollEnabled}
                     style={[styles.pageScene]}>
                <View>
                    {this.getLoading()}
                    {this.props.children}
                    {util.alertTip.render(this.event)}
                </View>
            </ScrollView>
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