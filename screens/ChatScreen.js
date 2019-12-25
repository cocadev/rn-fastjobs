import React from 'react';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import Header from '../components/Header';
import Box from '../components/Box';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { i } from '../constants/Style';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { width } from '../constants/Layout';
import { t } from '../constants/Text';

export default class ChatScreen extends React.Component {

  static navigationOptions = {
    header:null
  };

  render() {
    return (
      <ScrollView style={i.container}>
         <Header title={'Chats'}/>
         <Text>Hello I am Chats screen !</Text>
         <View style={{marginTop:28}}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});
