import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { t } from '../constants/Text';
import Colors from '../constants/Colors';

const width = Dimensions.get('window').width;

export default class Button extends React.Component {
 
  render() {
    const { icon, switchs } = this.props;
    return (
        <View style={{position:'relative', padding:12, paddingRight:25, justifyContent:'center', alignItems:'center'}}>
            <View style={styles.box}>
                <MaterialCommunityIcons name={icon} size={45} color={Colors.BLUE} />
                <Text style={t.text_b}>{switchs}</Text>
            </View>
            <View style={styles.boxIcon}>
                <Ionicons name={"ios-more"} size={25} color={Colors.WHITE} />
            </View>
            <Text style={[t.ThinText, {marginTop:8}]}>Lue Centeral</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
     box:{
       borderRadius:6,
       width:width/4.5,
       height:width/4,
       borderColor:Colors.GREY,
       borderWidth:1,
       justifyContent:'center',
       alignItems:'center',
     },
     boxIcon:{
       position:'absolute',
       right:7,
       bottom:35,
       zIndex:1,
       backgroundColor:Colors.BLUE, 
       borderRadius:18, 
       width:36, 
       height:36, 
       justifyContent:'center', 
       alignItems:'center',
     }
  });
  