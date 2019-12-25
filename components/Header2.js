import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { pic } from '../constants/Image';
import Colors from '../constants/Colors';
import { Actions } from 'react-native-router-flux'

export default class Header2 extends React.Component {
 
  render() {
    const {title} =  this.props
    return (

        <View style={styles.header}>

          <View>
            {this.props.leftE}
          </View>

          <Text style={{fontSize:20, color:Colors.WHITE}}>{title}</Text>

          <View>
             {this.props.rightE}
          </View>

        </View>
    )
  }
}

  const styles = StyleSheet.create({
    header:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between', 
      backgroundColor:Colors.DARKBLUE, 
      padding:15,
      paddingHorizontal:12,
      borderColor:Colors.GREEN,
      borderBottomWidth:4,
      elevation:5,
    },
    icon: {
      position:'absolute', 
      right:8, 
      backgroundColor:Colors.PINK, 
      justifyContent:'center', 
      alignItems:'center', 
      width:28, 
      height:28, 
      borderRadius:14, 
      top:2
    }
  });
  