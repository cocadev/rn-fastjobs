import React from 'react';
import Colors from '../constants/Colors';
import Header2 from '../components/Header2';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView, ToastAndroid, Modal, ScrollView } from 'react-native';
import { i } from '../constants/Style';
import { Actions } from 'react-native-router-flux';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { withNamespaces } from "react-i18next";
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';

const width = Dimensions.get('window').width;

class ProfileContact extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      emergency_contact_no: '',
      myState: ' ',
      address: '',
      city: '',
      emergency_contact: '',
      country: ' ',
      checked_state: 1,
      stateModal: false
    };
  }

  componentDidMount() {
    this.setState({
      emergency_contact_no: this.props.data.emergency_contact_no,
      myState: this.props.data.myState,
      address: this.props.data.address,
      city: this.props.data.city,
      emergency_contact: this.props.data.emergency_contact,
      country: this.props.data.country,
    })
  }

  save = () => {

    if (!this.state.text) {
      ToastAndroid.show('Address can not be null !', ToastAndroid.SHORT);
      return false
    }

    console.log('hi')
    console.log('title', this.state.text)

  }

  stateModal() {
    const { checked_state, _state } = this.state
    const { t } = this.props;

    return (
      <Modal
        visible={this.state.stateModal}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={i.modalContainer}>
          <View style={[i.modal, { height: width / 1 }]}>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: Colors.DARKBLUE, margin: 10, textAlign: 'center', marginVertical: 20 }}>State</Text>
            </View>

            <CircleCheckBox
              checked={_state === "Kuala Lumpur" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ _state: "Kuala Lumpur" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Kuala Lumpur"
              styleLabel={{ width: width / 2, marginVertical: 3, color: _state === "Kuala Lumpur" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={_state === "Labuan" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ _state: "Labuan" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Labuan"
              styleLabel={{ width: width / 2, marginVertical: 3, color: _state === "Labuan" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={_state === "Melaka" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ _state: "Melaka" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Melaka"
              styleLabel={{ width: width / 2, marginVertical: 3, color: _state === "Melaka" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={_state === "Negeri Sembilan" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ _state: "Negeri Sembilan" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Negeri Sembilan"
              styleLabel={{ width: width / 2, marginVertical: 3, color: _state === "Negeri Sembilan" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={_state === "Pahang" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ _state: "Pahang" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Pahang"
              styleLabel={{ width: width / 2, marginVertical: 3, color: _state === "Pahang" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={_state === "Penang" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ _state: "Penang" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Penang"
              styleLabel={{ width: width / 2, marginVertical: 3, color: _state === "Penang" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={_state === "Perak" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ _state: "Perak" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Perak"
              styleLabel={{ width: width / 2, marginVertical: 3, color: _state === "Perak" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={_state === "Perlis" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ _state: "Perlis"  })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Perlis"
              styleLabel={{ width: width / 2, marginVertical: 3, color: _state === "Perlis"  ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={_state === "Putrajaya" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ _state: "Putrajaya" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Putrajaya"
              styleLabel={{ width: width / 2, marginVertical: 3, color: _state === "Putrajaya" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={_state === "Selangor" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ _state: "Selangor" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Selangor"
              styleLabel={{ width: width / 2, marginVertical: 3, color: _state === "Selangor" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <View style={{ flexDirection: 'row', marginBottom: 12, marginTop: 6 }}>
              <TouchableOpacity style={i.modalBtn} onPress={() => this.setState({ stateModal: false })}>
                <Text style={{ color: Colors.WHITE }}> {t("button:cancel")} </Text>
              </TouchableOpacity>

              <TouchableOpacity style={i.modalBtn} onPress={() => this.setState({ stateModal: false })}>
                <Text style={{ color: Colors.WHITE }}> {t("button:ok")} </Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </Modal>
    )
  }

  render() {
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

        <ScrollView style={{ margin: 12, }} >

          <View style={styles.row}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE }}>Address</Text>
            <TextInput
              style={{ height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, width: width - 36 }}
              onChangeText={(address) => this.setState({ address })}
              value={this.state.address}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE }}>City</Text>
            <TextInput
              style={{ height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, width: width - 36 }}
              onChangeText={(city) => this.setState({ city })}
              value={this.state.city}
            />
          </View>

          <View style={[{ borderBottomColor: Colors.GREY, borderBottomWidth: 1, marginHorizontal: 6, marginTop: 12 }]}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE, }}>State</Text>
            <TouchableOpacity onPress={()=>this.setState({stateModal: true})} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: width - 36, marginTop: 10, }}>
            <Text>{this.state._state}</Text>
              <MaterialCommunityIcons name="chevron-right" size={30} color={Colors.GREY} style={{ marginTop: -30 }} />
            </TouchableOpacity>
          </View>

          <View style={[{ borderBottomColor: Colors.GREY, borderBottomWidth: 1, marginHorizontal: 6, marginTop: 12 }]}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE, }}>Country</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: width - 36, marginTop: 10, }}>
              <Text>{this.state.country}</Text>
              <MaterialCommunityIcons name="chevron-right" size={30} color={Colors.GREY} style={{ marginTop: -30 }} />
            </View>
          </View>

          <View style={styles.row}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE }}>Emergency Contact</Text>
            <TextInput
              style={{ height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, width: width - 36 }}
              onChangeText={(emergency_contact) => this.setState({ emergency_contact })}
              value={this.state.emergency_contact}
            />
          </View>

          <View style={[styles.row, { marginBottom:20 }]}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE }}>Emergency Contact No.</Text>
            <TextInput
              style={{ height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, width: width - 36 }}
              onChangeText={(emergency_contact_no) => this.setState({ emergency_contact_no })}
              value={this.state.emergency_contact_no}
            />
          </View>
        </ScrollView>

        {this.stateModal()}

      </KeyboardAvoidingView>
    );
  }
}

export default withNamespaces(["common"], { wait: true })(
  ProfileContact
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
