import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { pic } from '../constants/Image';
import Colors from '../constants/Colors';
import { Actions } from 'react-native-router-flux'

export default class Header extends React.Component {
 
  render() {
    const {title, main, right} =  this.props
    return (

        <View style={styles.header}>

          {
            main 
            ? <Image source={pic.awesome} style={{width:186, height:46, position:'absolute', left:10}} />
            : <TouchableOpacity onPress={()=>Actions.pop()}  style={{position:'absolute', left:12}}>
                <Ionicons name="ios-arrow-dropleft" size={32} color={Colors.WHITE}/>
              </TouchableOpacity>
          }
          
          {
            !right && <Image source={pic.logo_2} style={{width:46, height:46, position:'absolute', right:10}} />
          }

          <Text style={{fontSize:20, color:Colors.WHITE}}>{title}</Text>

            {this.props.rightE}
          
        </View>
    )
  }
}

  const styles = StyleSheet.create({
    header:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center', 
      backgroundColor:Colors.DARKBLUE, 
      padding:15,
      paddingHorizontal:8,
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
  