import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from '../constants/Colors';

const width = Dimensions.get('window').width;

export default class UserPayListItem extends React.Component {

  constructor() {
    super();
    this.state = {
      check: false,
    }
  }

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity style={{ backgroundColor: Colors.WHITE, marginTop: 6 }}>

        <View style={{ flexDirection: 'row', marginLeft: 30, }}>

          <View style={{ flex: 1 }}>

            <View style={{ flexDirection: "row", alignItems:'center' }}>
              <Text style={{ fontSize: 18, color:Colors.BLUE, marginHorizontal:5, fontWeight:'bold' }}>{item.name}</Text>
              <Ionicons name="md-heart" size={26} color={item.like?Colors.PINK:Colors.GREY2} style={{marginLeft:12, marginTop:7}}/>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Entypo name="location-pin" size={20} color={Colors.GREY1} />
              <Text style={{ color: Colors.GREY2 }}>{item.city}</Text>
            </View>

          </View>

          <View style={{ flex: 2, alignItems: 'flex-end', flexDirection:'row', marginTop: 8, position:'absolute', right:20 }}>
            <Text style={{ color: Colors.BLUE, fontSize: 18, fontWeight: '600' }}>{item.price}</Text>
            <Text style={{ color: Colors.GREY1, fontSize: 18, fontWeight: '600' }}> HRS | MYR </Text>
            <Text style={{ color: Colors.BLUE, fontSize: 18, fontWeight: '600' }}>{item.rate}</Text>
          </View>

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 32, marginTop:6 }}>
          <View style={{ flexDirection: 'row' }}>
            <MaterialIcons name="date-range" size={20} color={Colors.GREY1} />
            <Text style={{ color: Colors.GREY1, fontSize: 14, marginLeft:2 }}>IN </Text>
            <Text style={{ color: Colors.BLUE, fontSize: 14, marginLeft:2 }}>{item.start} </Text>
            <Ionicons name="ios-checkmark-circle-outline" size={20} color={Colors.GREY1} style={{marginLeft:8}} />
            <Text style={{ color: Colors.GREY1, fontSize: 14, marginLeft:2}}>OUT </Text>
            <Text style={{ color: Colors.BLUE, fontSize: 14, marginLeft:2}}>{item.end} </Text>

          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={{marginHorizontal:2, color:Colors.GREY1, fontSize: 18, fontWeight: '600'}}>$</Text>
            <Text style={{ color: Colors.PINK, fontSize: 18, fontWeight: '600', paddingRight: 20, }}>{item.budget}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

