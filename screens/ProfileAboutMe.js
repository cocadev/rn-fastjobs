import React from 'react';
import Colors from '../constants/Colors';
import Header2 from '../components/Header2';
import UtilService from '../utils/utils';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView, Image, Modal, ScrollView } from 'react-native';
import { i } from '../constants/Style';
import { Actions } from 'react-native-router-flux';
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { withNamespaces } from "react-i18next";

import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Permissions from 'expo-permissions';

import api from '../api'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../src/store/common/actions";

const width = Dimensions.get('window').width;

class ProfileAboutMe extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      name: ' ',
      gender: ' ',
      birthday: ' ',
      employment_status: ' ',
      mobile: ' ',
      passport: ' ',
      education: ' ',
      avatar: ' ',
      educationModal: false,
      photoModal: false,
      isDateTimePickerVisible: false,
    };
  }

  componentDidMount() {
    this.setState({

      name: this.props.currentUser.me.name,
      gender: this.props.currentUser.me.gender,
      birthday: this.props.currentUser.me.birthday,
      _state: this.props.currentUser.me.employment_status,
      mobile: this.props.currentUser.me.mobile,
      passport: this.props.currentUser.me.passport,
      education: this.props.currentUser.me.highest_education,
      avatar: this.props.currentUser.me.photoURL

    })
  }

  save = () => {

    const { name, gender, birthday, _state, mobile, passport, education, avatar } = this.state;
    console.log('res JOOOOOOOOON res', birthday)
    console.log('res JOOOOOOOOON res', _state)
    console.log('res JOOOOOOOOON res', gender)
    console.log('res JOOOOOOOOON res', education)
    console.log('res JOOOOOOOOON res', mobile)
    console.log('res JOOOOOOOOON res', name)
    console.log('res JOOOOOOOOON res', passport)
    console.log('res JOOOOOOOOON res', avatar)
    console.log('res JOOOOOOOOON userId', this.props.userId)

    api.aboutMe(this.props.userId, birthday, _state, gender, education, mobile, name, passport, avatar, (err, res) => {
      if (err == null) {
        console.log('res &&&&&&&&', res)

        if (this.props.update) {
          this.props.update()
          Actions.pop();
        }
      } else {
        console.log('err &&&&&&&&', err)
      }
    })
  }

  photoModal() {

    const { education } = this.state
    const { t } = this.props;

    return (
      <Modal
        visible={this.state.photoModal}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={i.modalContainer}>
          <View style={[i.modal, { height: width / 2.3 }]}>

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <TouchableOpacity onPress={this.takePicture} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons name="camera" size={44} color={Colors.DARK} />
                <Text style={{ fontSize: 12, color: Colors.DARKBLUE, margin: 10, textAlign: 'center', marginVertical: 11 }}>Take a Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this._pickImage} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesome name="picture-o" size={40} color={Colors.DARK} />
                <Text style={{ fontSize: 12, color: Colors.DARKBLUE, margin: 10, textAlign: 'center', marginVertical: 11, marginTop: 15 }}>Choose Existing Photo</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 12, marginTop: 20 }}>
              <TouchableOpacity style={i.modalBtn} onPress={() => this.setState({ photoModal: false })}>
                <Text style={{ color: Colors.WHITE }}> {t("button:cancel")} </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }


  educationModal() {
    const { education } = this.state
    const { t } = this.props;

    return (
      <Modal
        visible={this.state.educationModal}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={i.modalContainer}>
          <View style={[i.modal, { height: width }]}>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: Colors.DARKBLUE, margin: 10, textAlign: 'center', marginVertical: 20 }}>Highest Education</Text>
            </View>

            <CircleCheckBox
              checked={education === "UPSR" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ education: "UPSR" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="UPSR"
              styleLabel={{ width: width / 2, marginVertical: 3, color: education === "UPSR" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={education === "PMR / Seconday School" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ education: "PMR / Seconday School" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="PMR / Seconday School"
              styleLabel={{ width: width / 2, marginVertical: 3, color: education === "PMR / Seconday School" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={education === "SPM O Level" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ education: "SPM O Level" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="SPM O Level"
              styleLabel={{ width: width / 2, marginVertical: 3, color: education === "SPM O Level" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={education === "STPM / A Level" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ education: "STPM / A Level" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="STPM / A Level"
              styleLabel={{ width: width / 2, marginVertical: 3, color: education === "STPM / A Level" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={education === "Skills certificate" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ education: "Skills certificate" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Skills certificate"
              styleLabel={{ width: width / 2, marginVertical: 3, color: education === "Skills certificate" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={education === "Polytechnics" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ education: "Polytechnics" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Polytechnics"
              styleLabel={{ width: width / 2, marginVertical: 3, color: education === "Polytechnics" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={education === "Diploma" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ education: "Diploma" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Diploma"
              styleLabel={{ width: width / 2, marginVertical: 3, color: education === "Diploma" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={education === "Degree" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ education: "Degree" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Degree"
              styleLabel={{ width: width / 2, marginVertical: 3, color: education === "Degree" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <View style={{ flexDirection: 'row', marginBottom: 12, marginTop: 6 }}>
              <TouchableOpacity style={i.modalBtn} onPress={() => this.setState({ educationModal: false })}>
                <Text style={{ color: Colors.WHITE }}> {t("button:cancel")} </Text>
              </TouchableOpacity>

              <TouchableOpacity style={i.modalBtn} onPress={() => this.setState({ educationModal: false })}>
                <Text style={{ color: Colors.WHITE }}> {t("button:ok")} </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    )
  }

  takePicture = async () => {

    let res = await Permissions.askAsync(Permissions.CAMERA)
    if (res.status === 'granted') {
      let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status === 'granted') {
        let image = await ImagePicker.launchCameraAsync({
          quality: 0.6
        })

        if (!image.cancelled) {

          const manipResult = await ImageManipulator.manipulateAsync(
            image.uri,
            [{ resize: { width: 768 } }],
            { format: 'jpeg', compress: 0.6 }
          );
          this.setState({ avatar: manipResult.uri, photoModal: false })

          // api.uploadImage(manipResult.uri, (err, res)=>{

          //   if ( err == null ){
          //       this.setState({
          //         image: res,
          //       });
          //   }     
          // })
        }
      }
    }
  }


  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);
    this.setState({ avatar: result.uri, photoModal: false })

    if (!result.cancelled) {
      this.setState({ avatar: result.uri })
      // api.uploadImage(result.uri, (err, res)=>{
      //   if ( err == null ){
      //       this.setState({
      //         image: res,
      //       });
      //   }     
      // })
    }
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({ birthday: date });
    this._hideDateTimePicker();
  };

  render() {
    const { t } = this.props
    const { gender, birthday } = this.state
    return (
      <KeyboardAvoidingView style={i.container} behavior={"padding"} >

        <Header2
          title={this.props.title}
          leftE={(
            <TouchableOpacity onPress={() => Actions.pop()}><Text style={{ color: '#fff' }}>Cancel</Text></TouchableOpacity>
          )}
          rightE={(
            <TouchableOpacity onPress={this.save}><Text style={{ color: '#fff' }}>Save</Text></TouchableOpacity>
          )}

        />

        <ScrollView style={{ padding: 12, }} >

          <View style={{ width: width - 24, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{ uri: this.state.avatar }} style={{ width: width / 3.5, height: width / 3.5, borderRadius: width / 7 }} />
          </View>

          <View style={{ width: width - 24, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={[i.modalBtn, { backgroundColor: Colors.PINK, width: width / 3, marginTop: 12 }]} onPress={() => this.setState({ photoModal: true })}>
              <Text style={{ color: Colors.WHITE }}> {t("button:change_photo")} </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE }}>Name</Text>
            <TextInput
              style={{ height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, width: width - 36 }}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE }}>Mobile</Text>
            <TextInput
              style={{ height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, width: width - 36 }}
              onChangeText={(mobile) => this.setState({ mobile })}
              value={this.state.mobile}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE }}>IC / Passport No</Text>
            <TextInput
              style={{ height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, width: width - 36 }}
              onChangeText={(passport) => this.setState({ passport })}
              value={this.state.passport}
            />
          </View>

          <View style={[{ borderBottomColor: Colors.GREY, borderBottomWidth: 1, marginHorizontal: 6, marginTop: 12 }]}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE, }}>Employment Status</Text>
            <TouchableOpacity onPress={() => this.setState({ stateModal: true })} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: width - 36, marginTop: 10, }}>
              <Text>{this.state._state}</Text>
              <MaterialCommunityIcons name="chevron-right" size={30} color={Colors.GREY} style={{ marginTop: -30 }} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => this.setState({ educationModal: true })} style={[{ borderBottomColor: Colors.GREY, borderBottomWidth: 1, marginHorizontal: 6, marginTop: 12 }]}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE, }}>Highest Education</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: width - 36, marginTop: 10, }}>
              <Text>{this.state.education}</Text>
              <MaterialCommunityIcons name="chevron-right" size={30} color={Colors.GREY} style={{ marginTop: -30 }} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.setState({ gender: gender === 'Male'?'FeMale':'Male' })} style={[{ borderBottomColor: Colors.GREY, borderBottomWidth: 1, marginHorizontal: 6, marginTop: 12 }]}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE, }}>Gender</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: width - 36, marginTop: 10, }}>
              <Text>{gender}</Text>
              <MaterialCommunityIcons name="chevron-right" size={30} color={Colors.GREY} style={{ marginTop: -30 }} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this._showDateTimePicker} style={[{ borderBottomColor: Colors.GREY, borderBottomWidth: 1, marginHorizontal: 6, marginTop: 12 }]}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE, }}>Birthday</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: width - 36, marginTop: 10, }}>
              <Text>{UtilService.getDateTime(birthday)}</Text>
              <MaterialCommunityIcons name="chevron-right" size={30} color={Colors.GREY} style={{ marginTop: -30 }} />
            </View>
          </TouchableOpacity>

          <View style={[styles.row, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text>Introduce yourself</Text>
            <Text>0/300</Text>
          </View>
        </ScrollView>

        {this.educationModal()}
        {this.photoModal()}

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />

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
)(withNamespaces(["other", "common"], { wait: true })(
  ProfileAboutMe
));


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
    height: 48,
    alignItems: 'flex-start',
    fontSize: 16,
    paddingLeft: 6,
    marginVertical: 10,
  },
  actionView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 7,
    borderBottomColor: Colors.GREY2,
    borderBottomWidth: 1,
    borderTopColor: Colors.GREY2,
    borderTopWidth: 1,
  }

});
