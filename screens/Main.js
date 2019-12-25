// import React from 'react';
// import { ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';
// import { i } from '../constants/Style';
// import { Ionicons } from "@expo/vector-icons";
// import Colors from '../constants/Colors';
// import { t } from '../constants/Text';
// import Button from '../components/Button';
// import Header from '../components/Header';

// export default class Main extends React.Component {

//   static navigationOptions = {
//     header:null
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       text: ''
//     };
//   }

//   render() {
//     return (
//       <ScrollView style={i.container}>
      
//          <Header />

//          <View style={{margin:12, position:"relative"}}>
//            <Ionicons name={"ios-search"} size={25} color={Colors.BLUE} style={{marginLeft:3, position:'absolute', top:8}} />

//            <TextInput
//             style={{height: 40, borderBottomColor: Colors.BLUE, borderBottomWidth: 1, paddingLeft:27, fontSize:16}}
//             onChangeText={(text) => this.setState({text})}
//           />

//           <Text style={t.TitleText}>Controles rapidos</Text>

//           <ScrollView horizontal>
//             <Button icon={'lightbulb-on-outline'} switchs={'ON'}/>
//             <Button icon={'snowflake'} switchs={'ON'}/>
//             <Button icon={'youtube-tv'} switchs={'OFF'}/>
//             <Button icon={'yin-yang'} switchs={'ON'}/>
//           </ScrollView>

//           <Text style={t.TitleText}>Cenarios pre-configurados</Text>

//           <ScrollView horizontal>
//             <Button icon={'webhook'} switchs={'OFF'}/>
//             <Button icon={'web'} switchs={'ON'}/>
//             <Button icon={'wan'} switchs={'ON'}/>
//             <Button icon={'walk'} switchs={'OFF'}/>
//             <Button icon={'virtual-reality'} switchs={'ON'}/>
//             <Button icon={'video-input-component'} switchs={'OFF'}/>
//             <Button icon={'video-input-antenna'} switchs={'ON'}/>
//             <Button icon={'video-image'} switchs={'ON'}/>
//             <Button icon={'vector-polygon'} switchs={'OFF'}/>
//             <Button icon={'ubuntu'} switchs={'OFF'}/>
//             <Button icon={'truck-delivery'} switchs={'ON'}/>
//             <Button icon={'thermometer-lines'} switchs={'OFF'}/>

//           </ScrollView>

//          </View>

         
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
  
// });
