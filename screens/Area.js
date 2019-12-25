import React from 'react';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import Header from '../components/Header';
import Box from '../components/Box';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { i } from '../constants/Style';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { width } from '../constants/Layout';
import { t } from '../constants/Text';
import { COUNTRY } from '../constants/Staticdata';

export default class Area extends React.Component {

  static navigationOptions = {
    header:null
  };

  constructor(){
    super();
    this.state = {
      activeSections: []
    }
  }

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  _renderHeader = item => {
    return (
      <View style={[i.horizontalView, {marginTop:18, marginHorizontal:18, borderTopEndRadius:10, borderTopLeftRadius:10, padding:18}]}>
      <View style={{flex:1}}>
        <Text style={[i.text, {color:'#555', fontWeight:'300', marginBottom:7}]}>{item.name}</Text>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Image source={item.avatar} style={i.roundIcon} />
          <Text style={[i.text, {color:'#666', fontSize:11, marginLeft:4}]}>{item.tag}</Text>
        </View>
      </View>
      <View style={{flexDirection:'row'}}>
        <View style={{marginRight:10, flexDirection:'row', marginTop:3}}>
          <Text style={[i.text, {color:'#666', fontSize:11}]}>{item.percentage} %</Text>
          <Ionicons name={item.increase ? "ios-arrow-up" : "ios-arrow-down"} size={15} color={item.increase ?'green':'red'} style={{marginHorizontal:3}}/>
        </View>
        <View style={{alignItems:'flex-end'}}>
          <Text style={[i.text, {color:'#666', fontSize:17, marginTop:-1}]}>{item.bi} {item.tag}</Text>
          <Text style={[i.text, {color:'#666', fontSize:12, marginTop:3}]}>€ {item.price}</Text>
        </View>
      </View>
    </View>
    );
  };
 
  _renderContent = item => {
    const open = () => {
      this.setState({ isModalVisible: true })
   }
  }
  
  render() {
    return (
      <ScrollView style={i.container}>
         <Header title={'Company Area'}/>
         <Text>Hello I am Area !</Text>

         <Accordion
          sections={COUNTRY}
          underlayColor='#f7f7f7'
          activeSections={this.state.activeSections}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />

         <View style={{marginTop:28}}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});
