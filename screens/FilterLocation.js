import React from 'react';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import Header from '../components/Header2';
import Box from '../components/Box';
import { ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Image, Dimensions, ImageBackground, Picker, TextInput, KeyboardAvoidingView, CheckBox } from 'react-native';
import { i } from '../constants/Style';
import { Ionicons } from "@expo/vector-icons";
import { t } from '../constants/Text';
import { pic } from '../constants/Image';
import { withNamespaces } from "react-i18next";
import { LOCATIONS } from '../constants/Staticdata';
import { Actions } from 'react-native-router-flux';

const width = Dimensions.get('window').width;

class FilterLocation extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      check: false,
      modalVisible: false,
      arrayfilter: this.props.filter_location ? this.props.filter_location : []
    };
    this._onFilter = this._onFilter.bind(this)
  }

  _onFilter = (z, index) => {

    let check = this.state.arrayfilter.includes(z);

    if(check) {
      this.setState(prevState => ({
        arrayfilter: prevState.arrayfilter.filter(i => i !== z)
      }))
    } else {
      this.setState(prevState => ({
        arrayfilter: [...prevState.arrayfilter, z]
      }))
    }
  }

  _renderItem = ({ item, t }) => (
    <TouchableOpacity 
      style={styles.row} 
      onPress={()=>{this._onFilter(item.title, item.id)}}>

      { this.state.arrayfilter.includes(item.title) 
       ? <Text style={{ fontSize: 17, fontWeight: '600' }}>{item.title}</Text>
       : <Text style={{ fontSize: 17 }}>{item.title}</Text> }
      
      { this.state.arrayfilter.includes(item.title) && <Ionicons name="md-checkmark" size={28} color={Colors.PINK} /> }

    </TouchableOpacity>
  );

  save = () => {
    if(this.props.update){
      this.props.update(this.state.arrayfilter.length === 0 ? null : this.state.arrayfilter )
      Actions.pop();
    }
  }

  render() {

    const { t } = this.props

    return (
      <KeyboardAvoidingView style={i.container} behavior={"padding"} >

        <Header
          title={'Location'}
          leftE={(
            <TouchableOpacity onPress={() => Actions.pop()}><Text style={{ color: '#fff' }}>Cancel</Text></TouchableOpacity>
          )}
          rightE={(
            <TouchableOpacity onPress={this.save}><Text style={{ color: '#fff' }}>Save</Text></TouchableOpacity>
          )}
        />

        <FlatList
          data={LOCATIONS}
          extraData={this.state}
          keyExtractor={(item, i) => String(i)}
          renderItem={this._renderItem}
        />

      </KeyboardAvoidingView>
    );
  }
}

export default withNamespaces(["common"], { wait: true })(FilterLocation);

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
    marginHorizontal:12,
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
