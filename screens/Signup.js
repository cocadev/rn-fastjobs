import React from 'react';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, CheckBox, ToastAndroid } from 'react-native';
import { i } from '../constants/Style';
import { MaterialIcons } from "@expo/vector-icons";
import { withNamespaces } from "react-i18next";
import firebase from '../firebase';
import { Actions } from 'react-native-router-flux';
import api from '../api'

class Signup extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm_password: '',
      check: false
    };
  }

  registerUser = () => {

    const { password, confirm_password, email } = this.state;
    if( password !== confirm_password){
      ToastAndroid.show('Password Mismatched!', ToastAndroid.SHORT);
      return false
    }

    this.setState({isWaiting:true})
    if(this.props.status){
      api.registerEmployer(email, password, confirm_password, (err, res) => {
        if (err == null ){
          console.log('res', res)
          ToastAndroid.show('Success!', ToastAndroid.SHORT);
          this.setState({isWaiting:false})
          Actions.pop('')
        } else{
          console.log('err', err)
          ToastAndroid.show(err.error[0], ToastAndroid.SHORT);
          this.setState({isWaiting:false})
        }
      })
    } else{
      api.registerJobSeeker(email, password, confirm_password, (err, res) => {
        if (err == null ){
          console.log('res', res)
          ToastAndroid.show('Success!', ToastAndroid.SHORT);
          this.setState({isWaiting:false})
          Actions.pop('')
        } else{
          console.log('err', err)
          ToastAndroid.show(err.error[0], ToastAndroid.SHORT);
          this.setState({isWaiting:false})
        }
      })
    }

    console.log('hey');

    try {
      console.log('hi');
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
        console.log(user);
        ToastAndroid.show("Success!!!", ToastAndroid.SHORT);

        Actions.pop()
      }).catch(e => console.log('errrr', e))
    } catch (error) {
      console.log(error.toString());
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
    }
  }

  render() {

    const { t } = this.props;
    if(this.state.isWaiting){
      return (
        <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
          <Text>Loading...</Text>
        </View>
        )
    }

    return (
      <KeyboardAvoidingView style={i.container} behavior={"padding"} >

        <Header title={t("header:signup")} />

        <ScrollView style={{ margin: 12, }}>

          <Text style={{ marginVertical: 6, }}>{this.props.status ? t("title:register_as_employer") : t("title:register_as_jobseeker")}</Text>

          <TextInput
            style={styles.input}
            placeholder={t("placeholder:email_address")}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />

          <View style={{ justifyContent: 'center', }}>

            <TextInput
              style={styles.input}
              placeholder={t("placeholder:password")}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            />
            <MaterialIcons name="visibility-off" size={24} color={Colors.DARK} style={{ position: 'absolute', right: 12 }} />

          </View>

          <View style={{ justifyContent: 'center', }}>

            <TextInput
              style={styles.input}
              placeholder={t("placeholder:confirm_password")}
              onChangeText={(confirm_password) => this.setState({ confirm_password })}
              value={this.state.confirm_password}
            />
            <MaterialIcons name="visibility-off" size={24} color={Colors.DARK} style={{ position: 'absolute', right: 12 }} />

          </View>

          <Text style={{ marginVertical: 6, }}>{t("title:company_information")}</Text>

          <TextInput
            style={styles.input}
            placeholder={t("placeholder:company_name")}
            onChangeText={(company_name) => this.setState({ company_name })}
            value={this.state.company_name}
          />

          <TextInput
            style={styles.input}
            placeholder={t("placeholder:company_phone_number")}
            onChangeText={(company_phone_number) => this.setState({ company_phone_number })}
            value={this.state.company_phone_number}
          />

          <TextInput
            style={styles.input}
            placeholder={t("placeholder:company_address")}
            onChangeText={(company_address) => this.setState({ company_address })}
            value={this.state.company_address}
          />

          <TextInput
            style={styles.input}
            placeholder={t("placeholder:company_area")}
            onChangeText={(company_area) => this.setState({ company_area })}
            value={this.state.company_area}
          />

          <View style={{ alignItems: 'center', flexDirection: 'row', }}>
            <CheckBox
              value={this.state.check}
              onChange={() => { this.setState({ check: !this.state.check }) }}
            />
            <Text style={{ marginLeft: 4, }}>{t("title:terms")}</Text>
          </View>

          <TouchableOpacity onPress={this.registerUser} style={{ backgroundColor: Colors.BLUE, alignItems: 'center', justifyContent: 'center', height: 40, flex: 1, marginTop: 6, }}>
            <Text style={{ color: Colors.WHITE }}>{t("button:register")}</Text>
          </TouchableOpacity>

        </ScrollView>

      </KeyboardAvoidingView>
    );
  }
}

export default withNamespaces(["common"], { wait: true })(
  Signup
);

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
  input: {
    height: 36,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 16,
    paddingLeft: 12,
    marginVertical: 4,
    borderRadius: 5,
  }
});
