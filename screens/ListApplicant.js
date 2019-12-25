import React from 'react';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import Header from '../components/Header';
import Box from '../components/Box';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal, Image, Dimensions, ImageBackground, Picker, TextInput, KeyboardAvoidingView, CheckBox, FlatList } from 'react-native';
import { i } from '../constants/Style';
import { Ionicons, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { t } from '../constants/Text';
import { pic } from '../constants/Image';
import { Actions, Scene, Router } from 'react-native-router-flux'
import MaterialTabs from 'react-native-material-tabs';
import ApplicantListItem from '../components/ApplicantListItem';
import { FEEDBACK } from '../constants/Staticdata';
import { withNamespaces } from "react-i18next";

const width = Dimensions.get('window').width;

class ListApplicant extends React.Component {

  static navigationOptions = {
    header:null
  };

  constructor(props){
    super(props);
    this.state = {
      selectedTab: 0,
      check: false
    };
  }

  setTab = selectedTab => {
    this.setState({ selectedTab });
  };

  _renderItem = ({ item }) => (
    <ApplicantListItem item={item} />
  );

  render() {
    const { t } = this.props
    return (
      <KeyboardAvoidingView style={i.container} behavior={"padding"} >

        <Header title={'List of Applicant'} right={true} rightE={(
          <TouchableOpacity onPress={()=>Actions.myfav()} style={{position:'absolute', right : 12}}>
            <MaterialCommunityIcons name="plus" size={30} color={Colors.WHITE}/>
          </TouchableOpacity>
        )}/>

        <ScrollView>

            <MaterialTabs
              items={['Show', 'All', 'Rejected', 'Accepted']}
              selectedIndex={this.state.selectedTab}
              onChange={this.setTab}
              barColor={Colors.WHITE}
              indicatorColor={Colors.GREEN}
              activeTextColor={Colors.DARK}
              inactiveTextColor={Colors.GREY2}
              textStyle={{fontSize:12}}
            />

            <View style={{flex:1, marginBottom: 2,}}>
              <FlatList
                data={FEEDBACK}
                keyExtractor={(item, i) => String(i)}
                renderItem={this._renderItem}
              />
            </View>

            <View style={{alignItems: 'center', flexDirection: 'row', margin: 6,}}>
              <CheckBox
                  value = { this.state.check }
                  onChange = {() => {this.setState({check: !this.state.check})} }
              />
              <Text style={{marginLeft: 4 }}>{t("title:select_all")}</Text>
            </View>

             <View style={{flexDirection: 'row'}}>

                <TouchableOpacity style={{backgroundColor:Colors.BLUE, alignItems: 'center', justifyContent:'center', height: 50, flex: 1, margin: 12, marginTop: 6,}}>
                  <Text style={{color: Colors.WHITE}}>{t("button:reject")}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor:Colors.BLUE, alignItems: 'center', justifyContent:'center', height: 50, flex: 1, margin: 12, marginTop: 6,}}>
                    <Text style={{color: Colors.WHITE}}>{t("button:accept")}</Text>
                </TouchableOpacity>

              </View>

        </ScrollView>

      </KeyboardAvoidingView>
    );
  }
}

export default withNamespaces(["common"], { wait: true })( ListApplicant );


// const styles = StyleSheet.create({

//   row:{
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     borderBottomColor: Colors.GREY2, 
//     borderBottomWidth: 1, 
//     fontSize:16, 
//     paddingLeft: 6,
//     marginTop:3,
//     marginBottom: 5,
//   },

//   text:{
//     color: Colors.GREY
//   },
  
//   statusText:{
//     position: 'absolute',
//     right:5,
//     color: Colors.Orange,
//     fontSize:18,
//     fontWeight: '600',
//   }

// });
