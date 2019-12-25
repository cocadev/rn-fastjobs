import React from 'react';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import { ScrollView, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { i } from '../constants/Style';
import { Entypo } from "@expo/vector-icons";
import { Actions } from 'react-native-router-flux'
import { withNamespaces } from "react-i18next";

class Approvers extends React.Component {

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
    const { t } = this.props;
    return (
      <KeyboardAvoidingView style={i.container} behavior={"padding"} >

        <Header title={t("header:select_approver")}/>

        <ScrollView style={{margin:12, }} >

            <TouchableOpacity style={styles.row} onPress={()=>{
              if(this.props.update){
                this.props.update('Ron Chan')
                Actions.pop();
              }
            }}>
              <Text style={{fontSize:17}}>Ron Chan - Financial Controller</Text>
              <Entypo name="chevron-small-right" size={32} color={Colors.GREY2}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.row} onPress={()=>{
              if(this.props.update){
                this.props.update('Sigit')
                Actions.pop();
              }
            }}>
              <Text style={{fontSize:17}}>Sigit - General Manager</Text>
              <Entypo name="chevron-small-right" size={32} color={Colors.GREY2}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.row} onPress={()=>{
              if(this.props.update){
                this.props.update('Fiona')
                Actions.pop();
              }
            }}>
              <Text style={{fontSize:17}}>Fiona - Banquet Manager</Text>
              <Entypo name="chevron-small-right" size={32} color={Colors.GREY2}/>
            </TouchableOpacity>

        </ScrollView>

      </KeyboardAvoidingView>
    );
  }
}

export default withNamespaces(["common"], { wait: true })(
  Approvers
);

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
