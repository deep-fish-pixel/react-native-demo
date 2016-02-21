import React, {
    StyleSheet,
} from 'react-native';
import util from './../common/util';
import commonStyle from './lib/commonStyle';

var styles = util.create(commonStyle, {
    item: {
        padding: 20,
        paddingTop: 12,
        paddingBottom: 12,
        borderBottomWidth: 1/util.ratio,
        borderColor: '#ddd',
        backgroundColor:'#fff'
    },
    titleText:{
        fontSize: 16,
        color: '#333',
    },
    titleIconView:{
        padding:-1,
        paddingLeft:2,
        paddingRight:2,
        borderWidth:1,
        borderColor:'#ff5a00',
        borderRadius: 3,
        marginTop:2,
        marginLeft:3,
    },
    titleIconText:{
        fontSize: 12,
        alignItems: 'center',
        color:'#ff5a00',
        textAlign: 'left',
    },
    introduction:{
        fontSize: 12,
        color: '#666',
    },
    rate:{
        color:'#ff5a00',
        fontSize: 22,
    },
    period:{
        paddingTop:5,
        color: '#333',
        fontSize: 14,
        alignItems: 'center',
    },
    downIntro:{
        color: '#909090',
        fontSize: 12,
    },
    btn:{
        height: 40,
        backgroundColor: '#228fff',
        borderWidth:1/util.ratio,
        borderColor:'#007BF9',
        borderRadius: 3,
        marginTop: 20,
    },
    btnText:{
        fontSize: 16,
        color: '#fff',
        alignItems: 'center',
        textAlign: 'center',
        marginVertical: util.platform=='ios'?10:8,
    },
});
module.exports = styles;