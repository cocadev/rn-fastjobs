import React from 'react';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import PasswordInputText from 'react-native-hide-show-password-input';

import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ImageBackground, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { i } from '../constants/Style';
import { pic } from '../constants/Image';
import { TextField } from 'react-native-material-textfield';
import { Actions } from 'react-native-router-flux';
import { withNamespaces } from "react-i18next";
import { Google, Facebook } from 'expo';
import { GOOGLE } from '../config';
import Cache from '../utils/cache'
import firebase from '../firebase';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../src/store/common/actions";
import api from '../api'

const width = Dimensions.get('window').width;

class Login extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      status: true,
      email: 'sven@d.com',
      password: '123456',
      isWaiting: false,
      myUpdate: false
    };
  }

  googleSignIn = async () => {
    this.setState({ isWaiting: true })
    try {
      const result = await Google.logInAsync({
        androidClientId: GOOGLE.androidClientId,
        iosClientId: GOOGLE.iosClientId,
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        console.log('my success result !!!', result)
        console.log('my success result accessToken !!!', result.accessToken)
        Actions.main({ myProfile: JSON.parse(JSON.stringify(result)).user, token: JSON.parse(JSON.stringify(result)).idToken })

        // const credential = firebase.auth.GoogleAuthProvider.credential(result.accessToken)

        // firebase.auth().signInAndRetrieveDataWithCredential(credential)
        //   .then((res) => {
        //     console.log(res)
        //     Actions.main({ myProfile: JSON.parse(JSON.stringify(res)).user, token: JSON.parse(JSON.stringify(res)).idToken })
        //   })

        //   .catch((error) => {
        //     console.log(error)
        //   })

        // Actions.map({ user: result.user.name, photoUrl: result.user.photoUrl });
        this.setState({ isWaiting: false })
      } else {
        console.log("cancelled")
        this.setState({ isWaiting: false })
      }
    } catch (e) {
      console.log("error", e)
      this.setState({ isWaiting: false })
    }
  }

  loginWithFacebook = async () => {

    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync("284047535824568", { permissions: ['public_profile'] })
      console.log('type', type)
      console.log('token', token)

      if (type == 'success') {

        const credential = firebase.auth.FacebookAuthProvider.credential(token)
        console.log('credential', credential)

        firebase.auth().signInAndRetrieveDataWithCredential(credential)
          .then((res) => {
            console.log(res)
            Actions.main({ myProfile: res.user, token: res.accessToken })

          })

          .catch((error) => {
            console.log(error)
          })
      }
    } catch (e) {
      console.log(e)
    }
  }

  callLoginAPI() {
    console.log('email', this.state.email)
    console.log('password', this.state.password)

    if (this.state.status) {
      console.log(' you are employer')
      api.signinEmployer(this.state.email, this.state.password, (err, res) => {
        if (err == null) {

          Object.keys(res.employer).map(function (_) {
            console.log('**************************', res.employer[_])
            return Actions.main({ userId: res.employer[_] })
          })

          ToastAndroid.show('Success!', ToastAndroid.SHORT);
          this.setState({ isWaiting: false })
        } else {
          console.log('err &&&&&&&&', err)
          this.setState({ isWaiting: false })
        }
      })
    } else {
      api.signinJobSeeker(this.state.email, this.state.password, (err, res) => {
        if (err == null) {

          Object.keys(res.employer).map(function (_) {
            return Actions.seeker({ userId: res.employer[_]._id })
          })

          ToastAndroid.show('Success!', ToastAndroid.SHORT);
          this.setState({ isWaiting: false })
        } else {
          console.log('err &&&&&&&&', err)
          this.setState({ isWaiting: false })
        }
      })
    }
  }

  emailAuthentication = () => {

    this.setState({ isWaiting: true })

    const { email, password } = this.state;
    const that = this
    that.callLoginAPI()

    // firebase.auth().signInWithEmailAndPassword(email, password)

    //   .then(function (response) {
    //     console.log(response);
    //     that.callLoginAPI()
    //   })

    //   .catch(function (error) {
    //     console.log(error.code);
    //     console.log(error.message);
    //     that.setState({ isWaiting: false })

    //   });


    // api.signin(email, password, (err, res) => {
    //   if (err == null ){
    //     this.setState({isWaiting:false})
    //     Object.keys(res.employer).map(function(_){return Actions.seeker({ myProfile: res.employer[_], token: res.token })})
    //     ToastAndroid.show('Success!', ToastAndroid.SHORT);
    //   } else{
    //     this.setState({isWaiting:false})
    //     console.log('err', err)
    //   }
    // })



    // })
    // .catch(e => {
    //   console.log('errrr', e)
    //   this.setState({isWaiting:false})
    //   ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
    // })
  }

  render() {

    const { status } = this.state
    const { t, me } = this.props

    if (this.state.isWaiting) {
      return (
        <View style={styles.container}>
          <Text style={styles.bold}>Loading ...</Text>
        </View>
      )
    }

    return (
      <KeyboardAvoidingView style={i.container} behavior={"padding"} >

        <Header title={' '} main={true} />

        <ScrollView>

          <View style={{ margin: 25, position: "relative" }}>

            <View style={styles.loginView}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>

                <TouchableOpacity style={status ? styles.roundBtn1 : styles.roundBtn2} onPress={() => { this.setState({ status: true }); Cache.admin = true }}>
                  <Text style={{ color: '#fff' }}>{t("button:employer")}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { this.setState({ status: false }); Cache.admin = false }} style={status ? styles.roundBtn2 : styles.roundBtn1} >
                  <Text style={{ color: '#fff' }}>{t("button:job_seeker")}</Text>
                </TouchableOpacity>

              </View>

              <View style={{ height: 4, backgroundColor: Colors.GREEN, width: '100%', }}>

              </View>

              <TextField
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
                onSubmitEditing={this.onSubmitLastName}
                returnKeyType='next'
                label='Email'
              />

              <PasswordInputText
                style={{ marginTop: 2 }}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
              />

              <Text style={[t.text_g, { textAlign: 'right', color: Colors.LIGHTBLUE }]}>{t("title:forgot_password")}</Text>

              <TouchableOpacity onPress={this.emailAuthentication} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                <ImageBackground source={pic.image_login} style={{ width: width / 2, height: 32, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, color: Colors.WHITE }}>{t("button:login")}</Text>
                </ImageBackground>
              </TouchableOpacity>

            </View>

          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center', }}>

            {status &&
              <View style={{ flexDirection: 'row', marginTop: 2, }}>
                <Text >{t("title:not_yet_register")}</Text>
                <TouchableOpacity onPress={() => Actions.signup({ status: this.state.status })}>
                  <Text style={{ color: Colors.BLUE, marginLeft: 6, }}>{t("title:signup_here")}</Text>
                </TouchableOpacity>
              </View>
            }

            <TouchableOpacity style={{ marginTop: 12, }} onPress={this.loginWithFacebook}>
              <Image source={pic.image_facebook} style={styles.button} />
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 12, }} onPress={this.googleSignIn}>
              <Image source={pic.image_google} style={styles.button} />
            </TouchableOpacity>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(
  state => ({
    currentUser: state.common.currentUser,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(withNamespaces(["common"], { wait: true })(Login));


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: width / 2,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  login: {
    width: 40,
    height: 40,
    marginRight: 12
  },
  loginView: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingBottom: 12,
    marginTop: width / 6,
    elevation: 3
  },
  roundBtn1: {
    backgroundColor: Colors.GREEN,
    color: Colors.WHITE,
    width: width / 2.6,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    // borderColor: '#666',
    // borderWidth: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: 'row'
  },
  roundBtn2: {
    backgroundColor: Colors.GREY3,
    color: Colors.WHITE,
    width: width / 2.6,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    // borderColor: '#666',
    // borderWidth: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row'
  }
});
