import React, {
    StyleSheet,
} from 'react-native';
import util from './../common/util';
import target from './productListPageStyle';

var styles = util.create(target, {
    item: {
        padding: 20,
        paddingTop: 12,
        paddingBottom: 12,
        borderBottomWidth: 1/util.ratio,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    paleItem: {
        padding: 20,
        paddingTop: 12,
        paddingBottom: 12,
    },
    itemBorder:{
        marginTop: 10,
    },
    flexBox:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    itemInput:{
        paddingTop: 7,
        paddingBottom: 7,
    },
    inputFlexBox:{
        height:28,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
    },
    input:{
        height:30,
        lineHeight:22,
        fontSize: 14,
    },
    inputLable:{
        width:100,
    },
    titleLableText: {
    },
    multiline: {
        height: 60,
        fontSize: 16,
        padding: 4,
        marginBottom: 10,
        width:100,
    },
    btn:{
        marginLeft: 20,
        marginRight: 20,
    },
    moneyColor:{
        color: '#ff5a00',
    },
    minCopies:{
        height:40,
        width:40,
        lineHeight:30,
        fontSize: 20,
        textAlign: 'center',
    },
    minCopiesBox:{
        borderWidth: 1/util.ratio,
        borderColor: '#ddd',
        borderRightWidth: 0,
    },
    addCopies:{
        height:40,
        width:40,
        lineHeight:30,
        fontSize: 20,
        textAlign: 'center',
    },
    addCopiesBox:{
        borderWidth: 1/util.ratio,
        borderColor: '#ddd',
        borderLeftWidth: 0,
    },
    copies:{
        height:41,
        width:50,
        lineHeight:32,
        fontSize: 14,
        borderWidth: 1/util.ratio,
        borderColor: '#ddd',
    },
});

//alert(styles.btn);
module.exports = styles;