import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        margin:0
    },
    
    active: {
        width:'33.33%',
        alignItems: 'center',
        borderTopWidth:3,
        borderTopColor:Colors.GREEN,
        height: 55,
        padding:6,
        backgroundColor:Colors.BLUE,
        flexDirection: 'row',
        justifyContent: 'center',

    },

    nonactive: {
        width:'33.33%',
        borderRightWidth:1,
        borderLeftWidth:1,
        borderColor:'#4b4b4b',
        borderTopWidth:3,
        borderTopColor:Colors.GREEN,
        height: 55,
        padding:6,
        // justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor:Colors.DARK,
        flexDirection: 'row',
        justifyContent: 'center',
    },

});

export default styles;