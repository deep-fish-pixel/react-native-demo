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
var styles = require('./../style/lib/pickerAlertStyle');
var util = require('./../common/util');
var AlertPicker = React.createClass({
    getInitialState() {
        this.options = {};
        return {
            animate:true,
            animateValue: new Animated.Value(0),
            selectedIndex: this.props.selectedIndex||0,
            showFlag: false,
        };
    },
    getDefaultProps() {
        return {
            data: [],
            animateTime: 150,
        };
    },
    componentDidMount() {

    },
    render: function() {
        var data = this.props.data;
        var event = this.getEvent()||{};
        var selectedIndex = this.state.selectedIndex;
        setTimeout(()=>util.page.setScroll(!this.showFlag), this.props.animateTime);
        if(this.showFlag && this.state.animate){
            this.animateIn();
        }
        //alert(event.offsetY+' '+event.height+' '+event.contentHeight);
        return !this.showFlag?(<View></View>):(
        <View style={[styles.validateBox]} onTouchStart={(event)=>{
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                  }}>
            <Animated.View style={[styles.validateBg,
                    {width:window.width, height:event.contentHeight},
                    {
                         opacity: this.state.animateValue.interpolate({
                             inputRange:[0, 1],
                             outputRange:[0, 1]
                         })
                    }]}
                  onPress={(event)=>{
                    return false;
                  }}
                ></Animated.View>
            <Animated.View style={[
                    styles.flexBoxCenter,
                    styles.alertBox,
                    styles.pickerContent,
                    {
                        width:window.width-30,
                        top: event.offsetY+event.height/2-206/2+(event.init?-20:-44),
                    },
                    {transform:[
                         {scale: this.state.animateValue.interpolate({
                             inputRange:[0, 1],
                             outputRange:[.8, 1]
                         })}],
                         opacity: this.state.animateValue.interpolate({
                             inputRange:[0, 1],
                             outputRange:[.3, 1]
                         }),
                    }
                    ]}
                    onPress={(event)=>{
                        return false;
                  }}>
                <PickerIOS
                    style={[styles.picker]}
                    selectedValue={selectedIndex}
                    onValueChange={(index) => {
                        this.setState({
                            selectedIndex: index,
                            animate: false,
                        });
                        this.props.onValueChange
                            &&this.props.onValueChange(data[index], index);
                    }}>
                    {data.map((item, index) => (
                        <PickerItemIOS
                            key={index}
                            value={index}
                            label={item.name}
                            />
                    ))}
                </PickerIOS>
                {
                    this.props.button===false?null:
                        <View style={[styles.flexBoxCenter, styles.alertBtnBox]}>
                            <TouchableHighlight onPress={this.slide} style={[styles.alertBtnTouch,styles.alertBtnTouchFirst]} underlayColor="#d0d0d0">
                                <Text style={styles.alertFirstBtn}>取消</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={()=>{
                                this.slide();
                                this.props.confirm&&this.props.confirm(data[selectedIndex], selectedIndex);
                            }} style={[styles.alertBtnTouch,styles.alertBtnTouchLast]} underlayColor="#d0d0d0">
                                <Text style={styles.alertFirstBtn}>确认</Text>
                            </TouchableHighlight>
                        </View>
                }
            </Animated.View>



        </View>

        );
    },
    animateIn() {
        this.state.animateValue.setValue(0);
        Animated.sequence([
            Animated.timing(this.state.animateValue, {
                toValue: 1,
                duration: this.props.animateTime,
            }),
        ]).start();
    },
    getEvent: function () {
        if(this.options.page){
            return this.options.page.event;
        }
    },
    config: function (options) {
        Object.assign(this.options, options);
    },
    slide: function () {
        this.showFlag = !this.showFlag;
        this.setState({
            showFlag: this.showFlag,
            animate: true,
        });
        /*if(this.options.page){
            this.options.page.setScroll(!this.showFlag);
        }*/
    },


});
module.exports = AlertPicker;