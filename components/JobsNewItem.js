import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import { Actions } from 'react-native-router-flux'
import UtilService from '../utils/utils';

const width = Dimensions.get('window').width;

export default class JobsNewItem extends React.Component {
 
  render() {
    const { item, current } = this.props;
    return (
        <TouchableOpacity style={{backgroundColor:Colors.WHITE, marginTop:6 }} onPress={()=>Actions.jobdetail({current, status: item.status})}>
          <Text style={{color:Colors.BLUE, fontSize:17, marginLeft:12, marginTop:12, fontWeight:'600'}}>{item.title}</Text>

          <View style={{flexDirection:'row', paddingHorizontal:12, marginVertical:10,}}>
            <View style={{ flex:3}}>
              <Text style={{color:Colors.GREY1, fontSize:16}}>{item.slug}</Text>
              <Text style={{color:Colors.GREY1}}> {item.createOn}</Text>
              <Text style={{color:Colors.GREY1}}> {item.createOff}</Text>

            </View>
            <View style={{ flex:1, padding:2}}>
              <Text style={{color:UtilService.getColor(item.status), fontSize:15, fontWeight:'600'}}> {UtilService.getStatus(item.status)}</Text>
            </View>
          </View>
        
          <View style={{flexDirection:'row', borderTopWidth:1, borderTopColor:'#f1f1f1'}}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center', paddingVertical:6,}}>
                <MaterialIcons name="visibility" size={19} color={Colors.GREY2} style={{marginHorizontal:1}}/>
                <Text style={{color:Colors.GREY2, fontSize:11}}> 602 Views</Text>
            </View>
            <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center', paddingVertical:4, borderLeftColor: '#f1f1f1', borderLeftWidth: 1, borderRightColor: '#f1f1f1', borderRightWidth: 1}}>
                <MaterialIcons name="mail-outline" size={19} color={Colors.GREY2} style={{marginHorizontal:1}} />
                <Text style={{color:Colors.GREY2, fontSize:11}}> 97 Applied</Text>
            </View>
            <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center', paddingVertical:4, }}>
                <MaterialIcons name="beenhere" size={18} color={Colors.GREY2} style={{marginHorizontal:1}} />
                <Text style={{color:Colors.GREY2, fontSize:11}}> 9/20 Accepted</Text>
            </View>
          </View>
        </TouchableOpacity>
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
  