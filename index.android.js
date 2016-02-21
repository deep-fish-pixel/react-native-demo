/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    AppRegistry,
    Navigator,
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';
var Page = require('./main/common/Page');
var ProductListPage = require('./main/andriod/ProductListPage');
var ProductBuyPage = require('./main/andriod/ProductBuyPage');
var NavigationBar = require('./main/common/nav/NavigationBar');
class projectTest extends Component {
    constructor(){
        super();
    }
    render() {
        return (
            <NavigationBar initialRoute={{
                id:"ProductListPage",
                title: '产品列表',
                component: ProductListPage
            }}>
            </NavigationBar>
        );


    }
}

AppRegistry.registerComponent('AwesomeProject', () => projectTest);
