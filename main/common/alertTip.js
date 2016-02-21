import React, {
    Animated,
    StyleSheet,
    ScrollView,
    Image,
    View,
    Text,
    Dimensions,
    PickerIOS,
    TouchableHighlight,
} from 'react-native';
var PickerItemIOS = PickerIOS.Item;
var window = Dimensions.get('window');
var styles = require('./../style/lib/commonStyle');
import pageUtil from './pageUtil';

var alertTip = {
    init() {
        this.animateValue = new Animated.Value(0);
    },
    /*
    * 注册消息
    * */
    notify(msg) {
        this.msg = msg;
        var page = pageUtil.getCurrentPage();
        page.setState({});
        if(this.timer){
            clearTimeout(this.timer);
            this.timer = 0;
        }
        this.timer = setTimeout(()=>{
            page.setState({});
            this.timer = 0;
        },2000);
    },
    /*
     * 提取消息
     * */
    render(event={}) {
        var msg = this.msg;
        if(!msg){
            return <View></View>;
        }
        this.msg = null;
        this._animate();
        return (
            <View style={styles.validateBox}>
                <View style={[styles.validateBg, {width:window.width, height:event.contentHeight}]}></View>
                <View style={[styles.flexBoxCenter, {width:window.width,}]}>
                    <View style={styles.flex}></View>
                    <Animated.View style={[
                    styles.validateContent,
                    {
                        top: event.offsetY+event.height/2-30/2+(event.init?-20:44),
                    },
                    {transform:[
                         {scale: this.animateValue.interpolate({
                             inputRange:[0, 1],
                             outputRange:[.6, 1]
                         })}],
                         opacity: this.animateValue.interpolate({
                             inputRange:[0, 1],
                             outputRange:[0, 1]
                         }),
                    }]}><Text style={styles.validateContentText}>{msg}</Text>
                    </Animated.View>
                    <View style={styles.flex}></View>
                </View>

            </View>
        )
    },
    _animate() {
        this.animateValue.setValue(0);
        Animated.sequence([
            Animated.timing(this.animateValue, {
                toValue: 1,
                duration: 300,
            }),
            Animated.delay(1400),
            Animated.timing(this.animateValue, {
                toValue: 0,
                duration: 300,
            })
        ]).start();
    },


};
alertTip.init();
module.exports = alertTip;