import React from 'react';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import Header from '../components/Header';
import Box from '../components/Box';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal, Image, Dimensions, ImageBackground, Picker, TextInput, KeyboardAvoidingView, CheckBox } from 'react-native';
import { i } from '../constants/Style';
import { Ionicons, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { t } from '../constants/Text';
import { pic } from '../constants/Image';
import { Actions, Scene, Router } from 'react-native-router-flux'

const width = Dimensions.get('window').width;

export default class UserManagement extends React.Component {

  static navigationOptions = {
    header:null
  };

  constructor(props) {
    super(props);
    this.state = { 
      text: '' ,
      check: false,
    };
  }

  render() {
    return (
      <KeyboardAvoidingView style={i.container} behavior={"padding"} >

        <Header title={'User Management'}/>

        <ScrollView style={{margin:12, }} >

            <TouchableOpacity 
               onPress={()=>Actions.addemployee()}
               style={{flexDirection: 'row', alignItems: 'center', height: 50, flex: 1, marginTop: 2, borderBottomColor: Colors.GREY2, borderBottomWidth: 1, }}>
              <Image source={pic.plus_2} style={{width:34, height:34}} />
              <Text style={{fontSize:17, marginLeft: 12, color:Colors.GREY1}}>Add Employee</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>Actions.addemployee({user: "Ron Chan", position: "Financial Controller"})} style={styles.row}>
              <Text style={{fontSize:17}}>Ron Chan - Financial Controller</Text>
              <Entypo name="chevron-small-right" size={32} color={Colors.GREY2}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>Actions.addemployee({user: "Sigit", position: "General Manager"})} style={styles.row}>
              <Text style={{fontSize:17}}>Sigit - General Manager</Text>
              <Entypo name="chevron-small-right" size={32} color={Colors.GREY2}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>Actions.addemployee({user: "Fiona", position: "Banquet Manager"})} style={styles.row}>
              <Text style={{fontSize:17}}>Fiona - Banquet Manager</Text>
              <Entypo name="chevron-small-right" size={32} color={Colors.GREY2}/>
            </TouchableOpacity>

        </ScrollView>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between', 
    backgroundColor:Colors.BACKGROUND, 
    height:54,
    padding:3,
    paddingHorizontal:8,
    borderColor:Colors.PINK,
    borderBottomWidth:4
  },
  row:{
    height: 40, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    borderBottomColor: Colors.GREY2, 
    borderBottomWidth: 1, 
    fontSize:16, 
    paddingLeft: 6,
    marginVertical: 10,
  },
  input:{
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1, 
      fontSize:16, 
      paddingLeft: 12,
      marginVertical: 10,
      borderRadius: 5,

      margin: 20,
      marginTop: 25,
      width:'90%'
  },
});
