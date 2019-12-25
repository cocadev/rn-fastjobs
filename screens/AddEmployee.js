import React from 'react';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import Header from '../components/Header';
import Box from '../components/Box';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ImageBackground, Picker, TextInput, KeyboardAvoidingView, CheckBox, Modal } from 'react-native';
import { i } from '../constants/Style';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { t } from '../constants/Text';
import { pic } from '../constants/Image';
import Cache from '../utils/cache'
import { withNamespaces } from "react-i18next";

const width = Dimensions.get('window').width;

class AddEmployee extends React.Component {

  static navigationOptions = {
    header:null
  };

  constructor(props) {
    super(props);
    this.state = { 
      name: this.props.user?this.props.user:'' ,
      check: false,
      position: this.props.position?this.props.position:'',
      phone:'',
      email:'',
      emp:'',
      modalVisible:false
    };
  }

  renderIndicator() {
    const { t } = this.props

    return (
      <Modal
        visible={this.state.modalVisible}
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={styles.modalContainer}>
             <View style={styles.modal}>
                
                  <Text >{t("title:delete_message")}</Text>  

                  <View style={{flexDirection:'row', justifyContent:'space-around',  width:'100%', marginTop: 12,}}>

                      <TouchableOpacity style={styles.modalBtn} onPress={()=>this.setState({modalVisible:false})}>
                           <Text style={{color:Colors.WHITE}}> {t("button:no")} </Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.modalBtn}>
                          <Text style={{color:Colors.WHITE}}> {t("button:yes")} </Text>
                      </TouchableOpacity>

                  </View>

            </View>
        </View>
      </Modal>
    );
  }

  render() {
    const { user, position, t } = this.props; 
    console.log("user ===> ", user)
    console.log("position ===> ", position)

    return (
      <KeyboardAvoidingView style={i.container} behavior={"padding"} >

        <Header title={user ? t("header:edit_employee") : t("header:add_employee")}/>

        <ScrollView style={{margin:12,}}>

            <TextInput
              style={styles.input}
              placeholder = {t("placeholder:name")}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
            />

            <TextInput
              style={styles.input}
              placeholder = {t("placeholder:phone")}
              onChangeText={(phone) => this.setState({phone})}
              value={this.state.phone}
            />

            <TextInput
              style={styles.input}
              placeholder = {t("placeholder:email")}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />

            <TextInput
              style={styles.input}
              placeholder = {'Emp No.'}
              onChangeText={(emp) => this.setState({emp})}
              value={this.state.emp}
            />

            <TextInput
              style={styles.input}
              placeholder = {t("placeholder:position")}
              onChangeText={(position) => this.setState({position})}
              value={this.state.position}
            />


             <Text style={{marginVertical: 6,}}>{t("title:department")} </Text>

              <View style={[styles.input, {paddingLeft: 2,}]}>

                <Picker
                  selectedValue={this.state.language}
                  style={{height: 50, flex: 1}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({language: itemValue})
                  }>
                  <Picker.Item label="Shshi" value="Shshi" />
                  <Picker.Item label="Electron" value="Electron" />
                  <Picker.Item label="Market" value="Market" />

                </Picker>

              </View>

              <View style={{flexDirection: 'row',}}>

                {
                  this.props.user&&
                  <TouchableOpacity onPress={()=>this.setState({modalVisible:true})} style={{backgroundColor:Colors.BLUE, alignItems: 'center', justifyContent:'center', height: 50, flex: 1, margin: 12,}}>
                    <Text style={{color: Colors.WHITE}}>{t("button:delete")}</Text>
                  </TouchableOpacity>
                }

                <TouchableOpacity style={{backgroundColor:Colors.BLUE, alignItems: 'center', justifyContent:'center', height: 50, flex: 1, margin: 12,}}>
                    <Text style={{color: Colors.WHITE}}>{t("button:save")}</Text>
                </TouchableOpacity>

              </View>

        </ScrollView>

        {this.renderIndicator()}

      </KeyboardAvoidingView>
    );
  }
}

export default withNamespaces(["common"], { wait: true })( AddEmployee );

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
  input:{
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    fontSize:16, 
    paddingLeft: 12,
    marginVertical: 10,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
      width: width-40,
      height: width/2.2,
      borderRadius: 5,
      shadowColor: "black",
      alignItems: "center",
      justifyContent: "center",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      backgroundColor: "white"
 },
 modalBtn:{
  padding:5, 
  marginHorizontal: 6 , 
  backgroundColor:Colors.BLUE, 
  width:70, 
  borderRadius:5, 
  alignItems: 'center',
}
});
