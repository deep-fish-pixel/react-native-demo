import React, {
    StyleSheet,
    ListView,
    TouchableHighlight,
    RefreshControl,
    Image,
    View,
    Text,
    TextInput,
    ActionSheetIOS,
    PickerIOS,
} from 'react-native';
var PickerItemIOS = PickerIOS.Item;
var Page = require('./../common/Page');
var styles = require('./../style/productBuyPageStyle');
var util = require('./../common/util');
var AlertPicker = require('./../common/AlertPicker');
var ProductBuyPage = React.createClass({
    getInitialState(): Object {
        var start = new Date();
        util.ajax({
            url: 'https://lcres.suning.com/ifs/app/data/page/buy-page.json',
            //url: 'http://192.168.191.3:8000/product.json',
            data: {
                id: this.props.id,
            },
            dataType: 'json',
            success: (data)=>{
                console.log(React.Platform);
                util.delay(()=>{
                    this.setState(data)
                }, util.config.pageTransitionTime, start);
                //this.setState(data)
            },
            error: (data)=>{
                util.alertTip.notify('网络繁忙');
            }
        });
        return {selectedIndex:0};
    },
    componentWillMount(): void {

     },
    render: function() {
        var state = this.state,
            promotion,
            disabledBtn={},
            disabledBtnText={};
        this.changeCopies();
        state.btnName = '立即购买';
        if(state.saleStatus == '02'){
            disabledBtn = {
                backgroundColor: '#f8f8f8',
                borderColor:'#ccc',
            };
            disabledBtnText = {
                color: '#666',
            };
            state.btnName = '暂停购买';
        }
        var selectedItem = state.selectedItem,
            area = selectedItem||state.defaultRegion&&state.defaultRegion[0];
        if(area){
            state.areaName = area.name;
            state.areaId = area.id;
        }
        if(state.id){
            //console.log(state.startBuyCopies, this.refs.copies&&this.refs.copies.props.value);
        }
        state.areas = ['北京', '南京'];

        return (!state.id?<Page loading={true}></Page>:
            <Page ref="page" loading={true} validate={this.validate}  onScroll={()=>{}}>
                <View style={styles.item}>

                    <View>
                        <View style={styles.flexBox}>
                            <Text style={styles.titleText}>{state.productName}</Text>
                            {state.promotionMark?<View style={styles.titleIconView}><Text style={styles.titleIconText}>{state.promotionMark}</Text></View>:null}
                        </View>
                        <View><Text style={styles.introduction}>{state.introduction}{state.btnStatus}</Text></View>
                    </View>
                    <View style={styles.mt4}>
                        <View style={styles.flexBox}>
                            <View style={styles.flex}><Text style={styles.rate}>{state.rate}%</Text></View>
                            <View style={styles.flex}><Text style={styles.period}>{state.adviseHoldName}</Text></View>
                            <View ><Text style={styles.period}>{state.period}</Text></View>
                        </View>
                        <View style={styles.flexBox}>
                            <View style={styles.flex}><Text style={styles.downIntro}>上期结算利率</Text></View>
                            <View style={styles.flex}><Text style={styles.downIntro}>建议持有</Text></View>
                            <View><Text style={styles.downIntro}>产品期限</Text></View>
                        </View>
                    </View>
                </View>
                <TouchableHighlight underlayColor="#d0d0d0"
                                    onPress= {()=>{}}>
                    <View style={styles.item}>
                        <View style={styles.flexBox}>
                            <View style={styles.flex}><Text style={styles.titleText}>产品详情</Text></View>
                            <View >
                                <Image source={require('./../style/image/right.png')} style={[styles.right]} />
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={[styles.item, styles.itemBorder]}>
                    <View style={styles.flexBox}>
                        <View style={styles.flex}><Text style={styles.titleText}>每份金额：</Text></View>
                        <View style={styles.flex}><Text style={[styles.titleText,{marginTop:-2,}]}>份数:<Text style={[styles.downIntro,{marginTop:-2,}]}>(最少1份，最多199份)</Text></Text></View>
                    </View>
                    <View style={styles.flexBox}>
                        <View style={styles.flex}><Text style={[styles.rate, styles.h3]}>{state.singleAmount}元</Text></View>
                        <View style={styles.flexBox}>
                            <TouchableHighlight style={styles.minCopiesBox} underlayColor="#d0d0d0" onPress={()=>{this.changeCopies(-1)}}><Text style={styles.minCopies}>-</Text></TouchableHighlight>
                            <View style={styles.copiesBox}><TextInput ref="copies" style={styles.copies}  value={state.startBuyCopies+''} onChangeText={(text)=>{this.state.startBuyCopies=text-0;this.changeCopies(0, true);}}/></View>
                            <TouchableHighlight style={styles.addCopiesBox} underlayColor="#d0d0d0" onPress={()=>{this.changeCopies(1)}}><Text style={styles.addCopies}>+</Text></TouchableHighlight>
                        </View>
                    </View>
                    <View style={styles.flexBox}>
                        <View style={styles.flex}><Text style={styles.downIntro}>购买金额：<Text style={[styles.downIntro, styles.moneyColor]}>{state.buyAmount}</Text>元，预计1年可赚：<Text style={[styles.downIntro, styles.moneyColor]}>{state.buyIncome}</Text>元</Text></View>
                    </View>
                </View>
                <View style={[styles.item, styles.itemBorder, styles.itemInput]}>
                    <View style={styles.inputFlexBox}>
                        <View style={styles.inputLable}><Text style={styles.titleLableText}>姓名：</Text></View>
                        <View style={styles.flex}><Text style={styles.titleLableText}>{state.name}</Text></View>
                    </View>
                </View>
                <View style={[styles.item, styles.itemInput]}>
                    <View style={styles.inputFlexBox}>
                        <View style={styles.inputLable}><Text style={styles.titleLableText}>身份证号：</Text></View>
                        <View style={styles.flex}><Text style={styles.titleLableText}>{state.idCard}</Text></View>
                    </View>
                </View>
                <View style={[styles.item, styles.itemInput]}>
                    <View style={styles.inputFlexBox}>
                        <View style={styles.inputLable}><Text style={styles.titleLableText}>手机：</Text></View>
                        <View style={styles.flex}><TextInput ref="mobile" style={styles.input}  value={state.mobile}  maxLength={11} placeholder="请输入手机号码" keyboardType="phone-pad"/></View>
                    </View>
                </View>
                <View style={[styles.item, styles.itemInput]}>
                    <View style={styles.inputFlexBox}>
                        <View style={styles.inputLable}><Text style={styles.titleLableText}>常住地区：</Text></View>
                        <View style={styles.flex}><Text ref="area" style={[styles.input,state.areaName?{}:{color: '#ccc'}]}
                                                             onPress={this.areaPress}>{state.areaName||"请选择省市"}</Text></View>
                    </View>
                </View>
                <View style={[styles.item, styles.itemInput]}>
                    <View style={styles.inputFlexBox}>
                        <View style={styles.inputLable}><Text style={styles.titleLableText}>地址：</Text></View>
                        <View style={styles.flex}><TextInput ref="address" style={styles.input}  value=""  placeholder="请填写详细地址"/></View>


                    </View>
                </View>
                <View style={[styles.item, styles.itemInput]}>
                    <View style={styles.inputFlexBox}>
                        <View style={styles.inputLable}><Text style={styles.titleLableText}>邮箱：</Text></View>
                        <View style={styles.flex}><TextInput ref="email" style={styles.input}  value=""  placeholder="用于接收电子保单" keyboardType="email-address"/></View>
                    </View>
                </View>
                <View style={styles.aBox}>
                    <View style={styles.flexBox}>
                        <View style={styles.flex} onPress={this.showAgreement}><Text onPress={this.showAgreement} style={styles.a}>我同意《服务协议》并申购</Text></View>
                    </View>
                </View>
                <TouchableHighlight style={[styles.btn, disabledBtn]}
                                    underlayColor="#0162C5"
                                    onPress= {this.btnClick}>
                    <Text style={[styles.btnText, disabledBtnText]}>{state.btnName}</Text>
                </TouchableHighlight>
                <View style={styles.paleItem}>
                    <View style={styles.flexBox}>
                        <View style={styles.flex}><Text style={styles.friendTip}>23:00至次日01:00暂停购买</Text></View>
                    </View>
                </View>
                <AlertPicker ref="pickerAlert" key="pickerAlert"
                             confirm={(item, index)=>{
                                this.setState({selectedItem:item});
                             }}
                             data={[{name:'北京',value:'1'}, {name:'南京',value:'2'}]}>
                </AlertPicker>
            </Page>

        );
    },
    changeCopies: function (amount=0, forceUpdate=false) {
        var state = this.state,
            update = amount || forceUpdate;
        var copies = state.startBuyCopies =
            this.changeRange(state.startBuyCopies,
                amount,
                1,
                state.singleLimitCopies
            );
        state.buyAmount = copies*state.singleAmount;
        state.buyIncome = state.buyAmount*state.adviseHold*state.rate/100;
        if(update){
            this.setState(state);
            //this.forceUpdate(state);
        }
    },
    /*
     * 值区间变化范围
     * */
    changeRange: function (count, amount, min, max) {
        count += amount;
        if(count<=min){
            count = 1;
        }
        else if(count>=max){
            count = max;
        }
        return count;
    },
    btnClick: function () {
        if(!this.validate){
            this.validate = util.Validate.create({
                component: this,
                validates: {
                    "mobile": {
                        method: "blur",
                        types: "empty",
                        msgs: ["请输入手机号"],
                        condition: function(a) {
                            return /^(130|131|132|133|134|135|136|137|138|139|147|20|151|152|153|155|156|157|158|159|170|171|172|173|174|175|176|177|178|179|180|181|182|183|184|185|186|187|188|189)\d{8}$/.test(a) || c.pageData.hiddenMobile && a === c.pageData.hiddenMobile && /^1[3-8]\d{9}$/.test(c.pageData.mobile) ? void 0 : "请输入有效的手机号码"
                        },
                        errorCallback: function() {}
                    },
                    "area": {
                        method: "blur",
                        types: "empty",
                        msgs: ["请选择省市"],
                        condition: function(a) {
                            },
                        errorCallback: function() {}
                    },
                    "address": {
                        method: "blur",
                        types: "empty",
                        msgs: ["请输入详细地址"],
                        condition: function(a) {
                            var b = "您的地址长度必须大于5个中文汉字"
                                , c = a.match(/[\w\d\s\.]/g)
                                , d = a.length - Math.floor((c && c.length || 0) / 2);
                            return 5 >= d ? b : a.length > 40 ? "您的地址长度超过上限" : a.match(/[州县区]/) ? void 0 : "您的地址中应包括州/县/区（例如XX州/区/县XXX村）"
                        },
                        errorCallback: function() {}
                    },
                    "email": {
                        method: "blur",
                        types: "empty",
                        msgs: ["请输入邮箱", "请输入正确的邮箱"],
                        condition: function(a) {
                            return util.Validate.types.email.reg.test(a) || c.pageData.hiddenEmail && a === c.pageData.hiddenEmail && util.Validate.types.email.reg.test(c.pageData.email) ? void 0 : "请输入正确的邮箱"
                        },
                        errorCallback: function() {}
                    }
                },
            });
        }
        if(!this.validate.valide()){

        }

    },
    showAgreement: function () {
        var DESTRUCTIVE_INDEX = 3;
        var CANCEL_INDEX = 4;
        ActionSheetIOS.showActionSheetWithOptions({
            options: [...this.state.protocol.map(function (item, index) {
                return item.tabName;
            }), '取消',
            ],
            cancelButtonIndex: CANCEL_INDEX,
        },
        (buttonIndex) => {
            //this.setState({ clicked: BUTTONS[buttonIndex] });

        });
    },
    areaPress: function () {

        this.refs.pickerAlert.config({
            //target用于目标对象
            target: this.refs.area,
            //page用于页面滚动参数
            page: this.refs.page
        });
        this.refs.pickerAlert.slide();
    }

});


module.exports = ProductBuyPage;