import React, {
    Animated,
    StyleSheet,
    ScrollView,
    Image,
    View,
    Text,
    Dimensions,
    PixelRatio,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';
var cssVar = require('cssVar');

var window = Dimensions.get('window');
var styles = require('./../style/lib/commonStyle');
var util = require('./../common/util');


class NavButton extends React.Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#B5B5B5"
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}

var NavigationBarRouteMapper = {

    LeftButton: function(route, navigator, index, navState) {
        if (index === 0) {
            return null;
        }

        var previousRoute = navState.routeStack[index - 1];
        return (
            <TouchableOpacity
                onPress={() => navigator.pop()}
                style={styles.navBarLeftButton}>
                <Text style={[styles.navBarText, styles.navBarButtonText]}>
                    {previousRoute.title}
                </Text>
            </TouchableOpacity>
        );
    },

    RightButton: function(route, navigator, index, navState) {
        return (
            <TouchableOpacity
                onPress={() => navigator.push(newRandomRoute())}
                style={styles.navBarRightButton}>
                <Text style={[styles.navBarText, styles.navBarButtonText]}>
                    Next
                </Text>
            </TouchableOpacity>
        );
    },

    Title: function(route, navigator, index, navState) {
        return (
            <Text style={[styles.navBarText, styles.navBarTitleText]}>
                {route.title} [{index}]
            </Text>
        );
    },

};



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
    componentWillMount: function() {
        var navigator = this.props.navigator;

        var callback = (event) => {
            console.log(
                `NavigationBarSample : event ${event.type}`,
                {
                    route: JSON.stringify(event.data.route),
                    target: event.target,
                    type: event.type,
                }
            );
        };

        // Observe focus change events from this component.
        this._listeners = [
            navigator.navigationContext.addListener('willfocus', callback),
            navigator.navigationContext.addListener('didfocus', callback),
        ];
    },
    componentDidMount() {
        if(this.needLoading()){
            this._animate();
        }
    },
    componentWillUnmount: function() {
        this._listeners && this._listeners.forEach(listener => listener.remove());
    },
    render: function() {
        util.page.setCurrentPage(this);
        var loading = this.getLoading();
        var Element = this.isScroll()? ScrollView : View;

        return (
            <Navigator
                debugOverlay={false}
                style={styles.appContainer}
                initialRoute={newRandomRoute()}
                renderScene={(route, navigator) => (
                  /*
                    * 属性配置说明
                    * onScroll 配置是否可以滚动
                    * onRefreshStart 配置是否有顶部下拉刷新功能
                    * loading 配置页面加载中空页面是否 加载中图标提示
                    * */
                    <Element onScroll={this.onScroll}
                             onRefreshStart={this.props.onRefreshStart}
                            onMomentumScrollEnd={this.onMomentumScrollEnd}
                             onScrollEndDrag={this.onScrollEndDrag}
                        >
                        {loading}
                        {this.props.children}
                        {util.alertTip.render(this.event)}
                    </Element>
                )}
                navigationBar={
                  <Navigator.NavigationBar
                    routeMapper={NavigationBarRouteMapper}
                    style={styles.navBar}
                  />
                }
            />
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
                duration: 500,
            }),
            Animated.timing(this.state.pageLoadingAnimateValue, {
                toValue: 0,
                duration: 500,
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

var styles = StyleSheet.create({
    messageText: {
        fontSize: 17,
        fontWeight: '500',
        padding: 15,
        marginTop: 50,
        marginLeft: 15,
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#CDCDCD',
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '500',
    },
    navBar: {
        backgroundColor: 'white',
    },
    navBarText: {
        fontSize: 16,
        marginVertical: 10,
    },
    navBarTitleText: {
        color: cssVar('fbui-bluegray-60'),
        fontWeight: '500',
        marginVertical: 9,
    },
    navBarLeftButton: {
        paddingLeft: 10,
    },
    navBarRightButton: {
        paddingRight: 10,
    },
    navBarButtonText: {
        color: cssVar('fbui-accent-blue'),
    },
    scene: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#EAEAEA',
    },
});


module.exports = Page;