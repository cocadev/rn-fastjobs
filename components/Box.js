import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { t } from '../constants/Text';
import Colors from '../constants/Colors';
const width = Dimensions.get('window').width;

export default class Box extends React.Component {
 
  render() {
    const { title } = this.props;
    return (
        <TouchableOpacity style={styles.box}>
            <Text style={{textAlign:'center', color:Colors.WHITE}}>{title}</Text>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
     box:{
        marginTop:12,
        borderRadius:6,
        width:width/4,
        height:width/4.2,
        marginRight:12,
        backgroundColor:Colors.BLUE,
        justifyContent:'center',
        alignItems:'center',
     },
  });
  