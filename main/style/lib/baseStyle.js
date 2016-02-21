import React, {StyleSheet} from 'react-native';
import baseUtil from './../../common/baseUtil';
/*
* 基本的样式定义
* */
var styles = baseUtil.create({
    /*
     * header
     * */
    h1: {
        fontSize: 12,
    },
    h2: {
        fontSize: 14,
    },
    h3: {
        fontSize: 18,
    },
    h4: {
        fontSize: 24,
    },
    h5: {
        fontSize: 30,
    },
    h6: {
        fontSize: 36,
    },
    /*
     * tip
     * */
    a: {
        fontSize: 12,
            color: '#228fff',
    },
    aBox: {
        padding: 20,
            paddingTop: 4
    },
    friendTip: {
        fontSize: 12,
            color: '#666',
    },
    /*
     * marginTop
     * */
    mt1:{
        marginTop: 2
    },
    mt2:{
        marginTop: 4
    },
    mt3:{
        marginTop: 6
    },
    mt4:{
        marginTop: 10
    },
    mt5:{
        marginTop: 14
    },
    mt6:{
        marginTop: 18
    },
    mt7:{
        marginTop: 24
    },
    /*
    * flex
    * */
    flexBox:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    flexBoxCenter:{
        flexDirection: 'row',
        justifyContent: 'center',
    },
    flexBoxRight:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    flex:{
        flex:1,
    },
    flex2:{
        flex:2,
    }
});
module.exports = styles;