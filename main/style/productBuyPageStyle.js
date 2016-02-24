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
        width:40,
        fontSize: 20,
        textAlign: 'center',
        marginTop:5,
    },
    minCopiesBox:{
        height:40,
        borderWidth: 1/util.ratio,
        borderColor: '#ddd',
        borderRightWidth: 0,
    },
    addCopies:{
        width:40,
        fontSize: 20,
        textAlign: 'center',
        marginTop:5,
    },
    addCopiesBox:{
        height:40,
        borderWidth: 1/util.ratio,
        borderColor: '#ddd',
        borderLeftWidth: 0,
    },
    copiesBox:{
        height:40,
        width:50,
        borderWidth: 1/util.ratio,
        borderColor: '#ddd',
        alignSelf: 'center',
        ...util.adaptorAndroid({
            paddingLeft:4,
        }),
    },
    copies:{
        height:39,
        ...util.adaptorAndroid({
            width:50,
        }),
        fontSize: 14,
        borderWidth:0,
        ...util.adaptorIos({
            textAlign: 'center',
        }),
    },
    right:{
        width:8,
        height:12,
        marginTop:3,
    },
});

//alert(styles.btn);
module.exports = styles;