// import React from 'react';
// import Colors from '../constants/Colors';
// import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, FlatList, TextInput, ImageBackground, Picker } from 'react-native';
// import { i } from '../constants/Style';
// import { Ionicons, MaterialCommunityIcons, MaterialIcons, EvilIcons, FontAwesome, Entypo } from "@expo/vector-icons";
// import { JOBS } from '../constants/Staticdata';
// import { pic } from '../constants/Image';
// import Carousel from 'react-native-banner-carousel';

// const width = Dimensions.get('window').width;

// export default class LinksScreen extends React.Component {

//   static navigationOptions = {
//     header:null
//   };

//   _renderItem = ({ item }) => (
//     <TouchableOpacity style={{backgroundColor:Colors.WHITE, paddingLeft:10, marginTop:6  }}>
//         <Text style={{color:Colors.BLUE, fontSize:17, marginLeft:12, marginTop:12, fontWeight:'600'}}>{item.title}</Text>

//         <View style={{flexDirection:'row', alignItems:'center', marginHorizontal:5}}>
//            <Entypo name="location-pin" size={20} color={Colors.GREY1} />
//            <Text style={{color:Colors.GREY2}}>{item.position}</Text>
//         </View>

//         <View style={{flexDirection:'row', paddingHorizontal:12, marginVertical:10,}}>
//            <Image source={{uri:item.image}} style={{ flex:1, width:50, height:45, borderRadius:4, borderWidth:1, borderColor:Colors.GREY2}} />
//            <View style={{ flex:3, marginLeft:12}}>
//              <Text style={{color:Colors.GREY1, fontSize:15}}>{item.slug}</Text>
//              <Text style={{color:Colors.GREY1}}>Posted {item.createOn}</Text>
//            </View>
//            <View style={{ flex:2,marginLeft:12}}>
//              <Text style={{color:Colors.PINK, fontSize:17, fontWeight:'600'}}>RM{item.money}</Text>
//              <Text>{item.rate + '/ hour'}</Text>
//            </View>
//         </View>
      
//         <View style={{flexDirection:'row', borderTopWidth:1, borderTopColor:'#f1f1f1'}}>
//           <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center', paddingVertical:6,}}>
//               <FontAwesome name="star-o" size={20} color={Colors.GREY} style={{marginHorizontal:6}}/>
//               <Text>Save</Text>
//           </View>
//           <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center', paddingVertical:4, }}>
//               <FontAwesome name="share-square-o" size={20} color={Colors.GREY} style={{marginHorizontal:6}} />
//               <Text>Share</Text>
//           </View>
//         </View>
//     </TouchableOpacity>
//   );

//   _ItemSeparator = () => <View style={styles.separator} />;

//   render() {
//     return (
//       <ScrollView style={i.container}>

//         <View style={styles.header}>
//           <EvilIcons name="arrow-left" size={32} color={Colors.WHITE} />
//           <View style={{flex:1,  marginHorizontal:8, position: 'relative'}}>
//             <TextInput 
//               style={{borderRadius:4, backgroundColor:Colors.WHITE, padding:2, paddingLeft:8,}}
//               placeholder={'Search FastJobs'}   
//             />
//             <EvilIcons style={styles.cross} name="close-o" size={24} color={Colors.BLACK} />

//             <View style={styles.icon}>
//               <Ionicons name="md-search" size={24} color={Colors.WHITE} />
//             </View>
//           </View>
//           <MaterialCommunityIcons name="bell-outline" size={30} color={Colors.WHITE} />
//         </View>

//         <View style={{flexDirection:'row', paddingHorizontal:8, paddingTop:8, backgroundColor:'#ecf0f3'}}>
//           <View style={{flex:1}}>
//             <View style={{flexDirection:'row', alignItems:'center'}}>
//               <Entypo name="location-pin" size={16} color={Colors.GREY1} />
//               <Text style={{color:Colors.GREY1, fontSize:10}}>LOCATION</Text>
//             </View>
//             <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:6, alignItems:'center'}}>
//               <Text>Kuala Lumpur</Text>
//               <Entypo name="triangle-down" size={16} color={Colors.GREY1} />
//             </View>
//           </View>
//           <View style={{flex:1,paddingLeft:12,  borderRightColor:Colors.GREY2, borderRightWidth:1,  borderLeftColor:Colors.GREY2, borderLeftWidth:1}}>
//               <Text style={{color:Colors.GREY1, fontSize:10}}>JOB FUNCTION</Text>
//               <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:6, alignItems:'center'}}>
//                   <Text>All</Text>
//                   <Entypo name="triangle-down" size={16} color={Colors.GREY1} />
//               </View>
//           </View>
//           <View style={{flex:1, paddingLeft:12}}>
//               <Text style={{color:Colors.GREY1, fontSize:10}}>FILTER</Text>
//               <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:6, alignItems:'center'}}>
//                   <Text>Recency</Text>
//                   <Entypo name="triangle-down" size={16} color={Colors.GREY1} />
//               </View>
//           </View>
//         </View>

//         <FlatList
//           data={JOBS}
//           keyExtractor={(item, i) => String(i)}
//           renderItem={this._renderItem}
//         />

//         <View style={{marginTop:28}}></View>

//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//     separator: {
//       height: 1,
//       backgroundColor: 'rgba(0, 0, 0, .08)',
//     },
//     header:{
//       flexDirection:'row',
//       alignItems:'center',
//       justifyContent:'space-between', 
//       backgroundColor:Colors.BACKGROUND, 
//       height:54,
//       padding:3,
//       paddingHorizontal:8,
//       borderColor:Colors.PINK,
//       borderBottomWidth:4
//     },
//     icon: {
//       position:'absolute', 
//       right:8, 
//       backgroundColor:Colors.PINK, 
//       justifyContent:'center', 
//       alignItems:'center', 
//       width:28, 
//       height:28, 
//       borderRadius:14, 
//       top:2
//     },
//     cross:{
//       position:'absolute', 
//       right:35,  
//       top:6
//     }
// });
