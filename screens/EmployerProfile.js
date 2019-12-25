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
import { withNamespaces } from "react-i18next";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../src/store/common/actions";
const width = Dimensions.get('window').width;

class EmployerProfile extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      check: false,
    };
  }


  render() {
    if (!this.props.userId) {
      return false
    }
    const { t } = this.props
    const me = this.props.userId
    console.log('***************props userId *****************', this.props.userId)
    return (
      <KeyboardAvoidingView style={i.container} behavior={"padding"} >

        <Header main={true} title={' '} />

        <ScrollView style={{ margin: 12, }} >

          <View style={styles.row}>
            <Text style={{ fontSize: 17 }}>{me.name}</Text>
            <Text style={{ fontSize: 17, color: 'grey' }}>{'Name'}</Text>
          </View>

          <View style={styles.row}>
            <Text style={{ fontSize: 17 }}>{me.email}</Text>
            <Text style={{ fontSize: 17, color: 'grey' }}>{'Email'}</Text>
          </View>

          <View style={styles.row}>
            <Text style={{ fontSize: 17 }}>{me.emp}</Text>
            <Text style={{ fontSize: 17, color: 'grey' }}>{'Emp'}</Text>
          </View>

          <View style={styles.row}>
            <Text style={{ fontSize: 17 }}>{me.phone}</Text>
            <Text style={{ fontSize: 17, color: 'grey' }}>{'Phone'}</Text>
          </View>

          <View style={styles.row}>
            <Text style={{ fontSize: 17 }}>{me.dept_name}</Text>
            <Text style={{ fontSize: 17, color: 'grey' }}>{'Department'}</Text>
          </View>

          <View style={styles.row}>
            <Text style={{ fontSize: 17 }}>{me.user_type}</Text>
            <Text style={{ fontSize: 17, color: 'grey' }}>{'User Type'}</Text>
          </View>



        </ScrollView>

      </KeyboardAvoidingView>
    );
  }
}

export default connect(
  state => ({
    userId: state.common.userId,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(EmployerProfile);


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.BACKGROUND,
    height: 54,
    padding: 3,
    paddingHorizontal: 8,
    borderColor: Colors.PINK,
    borderBottomWidth: 4
  },
  row: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Colors.GREY2,
    borderBottomWidth: 1,
    fontSize: 16,
    paddingLeft: 6,
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    width: width - 40,
    height: width / 2.2,
    borderRadius: 5,
    shadowColor: "black",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    backgroundColor: "white"
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 16,
    paddingLeft: 12,
    marginVertical: 10,
    borderRadius: 5,

    margin: 20,
    marginTop: 25,
    width: '90%'
  },
  modalBtn: {
    padding: 5, marginHorizontal: 6, backgroundColor: Colors.BLUE, width: 70, borderRadius: 5, alignItems: 'center',
  }
});
