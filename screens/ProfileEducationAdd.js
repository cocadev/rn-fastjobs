import React from 'react';
import Colors from '../constants/Colors';
import Header2 from '../components/Header2';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { i } from '../constants/Style';
import { Actions } from 'react-native-router-flux';
import ToggleSwitch from 'toggle-switch-react-native'


const width = Dimensions.get('window').width;

export default class ProfileEducationAdd extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.data && this.props.data.name,
      title: this.props.data && this.props.data.title,

      check: false,
      starCount: this.props.data ? this.props.data.ranking : 0,
      start: this.props.data && this.props.data.start,
      end: this.props.data && this.props.data.end,
      isOn: false

    };
  }

  save = () => {

    if (!this.state.text) {
      ToastAndroid.show('Education can not be null !', ToastAndroid.SHORT);
      return false
    }

    console.log('hi')
    console.log('title', this.state.text)
    console.log('ranking', this.state.starCount)

  }

  render() {
    console.log('starRating', this.state.starCount)
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

        <View style={{ margin: 12, }} >

          <View style={styles.row}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE }}>Education Level</Text>
            <TextInput
              style={{ height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, width: width - 36 }}
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE }}>School Institute</Text>
            <TextInput
              style={{ height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, width: width - 36 }}
              onChangeText={(title) => this.setState({ title })}
              value={this.state.title}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE }}>School Period</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={{ height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, width: width / 2 - 36 }}
                onChangeText={(start) => this.setState({ start })}
                placeholder={'START YEAR'}
                value={this.state.start}
              />
              <Text> - </Text>
              <TextInput
                style={{ height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, width: width / 2 - 36 }}
                onChangeText={(end) => this.setState({ end })}
                placeholder={'END YEAR'}
                value={this.state.end}
              />
            </View>
          </View>

          <View style={[styles.row, {flexDirection:'row', alignItems:'center'}]}>
            <ToggleSwitch
              isOn={this.state.isOn}
              onColor={Colors.DARKBLUE}
              offColor={Colors.GREY}
              label='I am currently studying'
              labelStyle={{ color: 'grey', fontWeight: '600' }}
              size='small'
              onToggle={(isOn) => this.setState({isOn})}
            />
          </View>
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
