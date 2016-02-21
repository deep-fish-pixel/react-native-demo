import React, {
    StyleSheet,
    ListView,
    TouchableHighlight,
    View,
    Text,
    Dimensions,
} from 'react-native';
var Page = require('./../common/Page');
var util = require('./../common/util');
var ProductBuyPage = require('./ProductBuyPage');
var styles = require('./../style/productListPageStyle');

var ProductListPage = React.createClass({
    getInitialState(): Object {
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.list = [];
        return {
            list: this.ds.cloneWithRows([]),
        };
    },
    addList: function (totalList) {
        this.setState({
            list: this.ds.cloneWithRows(totalList)
        });
    },
    componentWillMount(): void {
        var self = this;
        this.scrollAjax = util.scrollAjax({
            url: 'https://lcres.suning.com/ifs/app/data/page/ifsList.json',
            //url: 'http://192.168.191.3:8000/ifsList.json',
            data: {
                name: 'mawei',
            },
            steps: 5,
            recordsFlag: 'lists',
            component: this,
            success: (list, totalList, xhr)=>{
                //alert(JSON.stringify(list));
                this.addList(totalList);
            }
        });
    },
    render: function() {
        var loading = this.scrollAjax.getLoading();
        return (
            <Page onScroll={this._onScroll} onRefresh={(end)=>
                         this.scrollAjax.refresh(()=> end())
                     }>
                <ListView
                    dataSource={this.state.list}
                    renderRow={this._renderRow}
                    />
                {loading}
            </Page>
        );
    },
    _renderRow: function (rowData: string, sectionID: number, rowID: number) {
        var promotion,
            disabledBtn={},
            disabledBtnText={};
        if(rowData.btnStatus == '02'){
            disabledBtn = {
                backgroundColor: '#f8f8f8',
                borderColor:'#ccc',
            };
            disabledBtnText = {
                color: '#666',
            };
        }
        return (
            <View style={styles.mt4}>
                <TouchableHighlight underlayColor="#d0d0d0"
                                    onPress= {()=>{this._onPress(rowData.id)}}>
                    <View style={[styles.item]}>
                        <View>
                            <View style={styles.flexBox}>
                                <Text style={styles.titleText}>{rowData.productName}</Text>
                                {rowData.promotionMark?<View style={styles.titleIconView}><Text style={styles.titleIconText}>{rowData.promotionMark}</Text></View>:null}
                            </View>
                            <View><Text style={styles.introduction}>{rowData.introduction}{rowData.btnStatus}</Text></View>
                        </View>
                        <View style={styles.mt4}>
                            <View style={styles.flexBox}>
                                <View style={styles.flex}><Text style={styles.rate}>{rowData.rate}%</Text></View>
                                <View style={styles.flex}><Text style={styles.period}>{rowData.adviseHold}</Text></View>
                            </View>
                            <View style={styles.flexBox}>
                                <View style={styles.flex}><Text style={styles.downIntro}>上期结算利率</Text></View>
                                <View style={styles.flex}><Text style={styles.downIntro}>建议持有</Text></View>
                            </View>
                        </View>
                        <View style={[styles.btn, disabledBtn]}>
                            <Text style={[styles.btnText, disabledBtnText]}>{rowData.btnName}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    },
    _onPress: function (id) {
        util.navigation.getNavigator().push(
            {
                title: '购买',
                component: ProductBuyPage,
                passProps: {
                    id
                },
                rightButtonTitle: '首页',
                onRightButtonPress: () => this.props.navigator.popToTop(),
            }
        );
    },
    _onScroll: function (event) {
        this.scrollAjax.get(event, function () {

        });

    }
});
module.exports = ProductListPage;