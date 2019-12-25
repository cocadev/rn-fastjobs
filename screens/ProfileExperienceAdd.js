import React from 'react';
import Colors from '../constants/Colors';
import Header2 from '../components/Header2';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { i } from '../constants/Style';
import { Actions } from 'react-native-router-flux';
import ToggleSwitch from 'toggle-switch-react-native'
import api from '../api'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../src/store/common/actions";
import { withNamespaces } from "react-i18next";

const width = Dimensions.get('window').width;

class ProfileExperienceAdd extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.data && this.props.data.data.name,
      title: this.props.data && this.props.data.data.title,
      start: this.props.data && this.props.data.data.start,
      end: this.props.data && this.props.data.data.end,
      status: this.props.data ? this.props.data.data.status : false
    };
  }

  save =()=>{
    if (!this.state.text) {
      ToastAndroid.show('Work Experience can not be null !', ToastAndroid.SHORT);
      return false
    }
    const { text, title, start, end, status } = this.state
    api.addExperience(this.props.userId, text, title, start, end, status, (err, res) => {
      if (err == null) {
        if (this.props.update) {
          this.props.update()
          Actions.pop();
        }
      } else {
        console.log('err &&&&&&&&', err)
      }
    })
  }

  _update =()=>{
    if (!this.state.text) {
      ToastAndroid.show('Work Experience can not be null !', ToastAndroid.SHORT);
      return false
    }
    const { text, title, start, end, status } = this.state
    api.updateExperience(this.props.userId, this.props.data.key, text, title, start, end, status, (err, res) => {
      if (err == null) {
        if (this.props.update) {
          this.props.update()
          Actions.pop();
        }
      } else {
        console.log('err &&&&&&&&', err)
      }
    })
  }

  render() {
    const { text, title, start, end, status } = this.state
    return (
      <KeyboardAvoidingView style={i.container} behavior={"padding"} >

        <Header2
          title={this.props.title}
          leftE={(
            <TouchableOpacity onPress={() => Actions.pop()}><Text style={{ color: '#fff' }}>Cancel</Text></TouchableOpacity>
          )}
          rightE={(
            <TouchableOpacity onPress={this.props.data?this._update: this.save}><Text style={{ color: '#fff' }}>Save</Text></TouchableOpacity>
          )}

        />

        <View style={{ margin: 12, }} >

          <View style={styles.row}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE }}>Job Title</Text>
            <TextInput
              style={{ height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, width: width - 36 }}
              onChangeText={(text) => this.setState({ text })}
              value={text}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE }}>Company</Text>
            <TextInput
              style={{ height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, width: width - 36 }}
              onChangeText={(title) => this.setState({ title })}
              value={title}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE }}>Work Period</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={{ height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, width: width / 2 - 36 }}
                onChangeText={(start) => this.setState({ start })}
                placeholder={'From'}
                value={start}
              />
              <Text> - </Text>
              <TextInput
                style={{ height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, width: width / 2 - 36 }}
                onChangeText={(end) => this.setState({ end })}
                placeholder={'To'}
                value={end}
              />
            </View>
          </View>

          <View style={[styles.row, {flexDirection:'row', alignItems:'center'}]}>
            <ToggleSwitch
              isOn={status}
              onColor={Colors.DARKBLUE}
              offColor={Colors.GREY}
              label='I am currently work here'
              labelStyle={{ color: 'grey', fontWeight: '600' }}
              size='small'
              onToggle={(status) => this.setState({status})}
            />
          </View>
          <View style={[styles.row, {justifyContent:'space-between', flexDirection:'row'}]}>
              <Text>Job Key Responsibilities</Text>
              <Text>0/600</Text>
          </View>
          <Text></Text>
        </View>

      </KeyboardAvoidingView>
    );
  }
}

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

export default connect(
  state => ({
    userId: state.common.userId,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(withNamespaces(["other", "common"], { wait: true })(
  ProfileExperienceAdd
));
