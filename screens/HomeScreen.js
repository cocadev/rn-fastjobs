import React from 'react';
import Colors from '../constants/Colors';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, FlatList, TextInput, ImageBackground } from 'react-native';
import { i } from '../constants/Style';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { JOBLISTING } from '../constants/Staticdata';
import { pic } from '../constants/Image';
import Carousel from 'react-native-banner-carousel';
import { withNamespaces } from "react-i18next";

const width = Dimensions.get('window').width;

class HomeScreen extends React.Component {

  static navigationOptions = {
    header:null
  };

  _renderItem = ({ item }) => (
    <TouchableOpacity style={{backgroundColor:Colors.WHITE, marginLeft:10, marginTop:10}}>
        <ImageBackground source={{uri:item.image}} style={{width:width/2-16, height:128}}>
            <View style={{flexDirection:'row',padding:10}}>
                <Image source={{uri: item.flag}} resizeMode="cover" style={{width:30, height:30, borderRadius:20}} />
                <Text style={{maxWidth:width/2-70, marginLeft:4, color:Colors.DARK, fontWeight:'600'}} numberOfLines={1}>{item.title}</Text>
            </View>
        </ImageBackground>
    </TouchableOpacity>
  );

  _ItemSeparator = () => <View style={styles.separator} />;

  render() {
    const { t } = this.props
    return (
      <ScrollView style={i.container}>

        <View style={styles.header}>
          <Image source={pic.logo_2} style={{width:50, height:50}} />
          <View style={{flex:1,  marginHorizontal:8, position: 'relative'}}>
            <TextInput 
              style={{borderRadius:4, backgroundColor:Colors.WHITE, padding:2, paddingLeft:8,}}
              placeholder={t("placeholder:search_fastjobs")}   
            />
            <View style={styles.icon}>
              <Ionicons name="md-search" size={24} color={Colors.WHITE} />
            </View>
          </View>
          <MaterialCommunityIcons name="bell-outline" size={30} color={Colors.WHITE} />
        </View>

        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={width}
        >
          <Image
            style={{ width: width, height: 200 }}
            source={pic.carousel_1}
          />
          <Image
            style={{ width: width, height: 200 }}
            source={pic.carousel_2}
          />
          <Image
            style={{ width: width, height: 200 }}
            source={pic.carousel_3}
          />
          <Image
            style={{ width: width, height: 200 }}
            source={pic.carousel_4}
          />
      </Carousel>

      <Text style={{margin:12, marginBottom:0}}>{t("title:Browse By Location")}</Text>

      <FlatList
        data={JOBLISTING}
        keyExtractor={(item, i) => String(i)}
        renderItem={this._renderItem}
        numColumns={2}
      />

      <View style={{marginTop:28}}></View>

      </ScrollView>
    );
  }
}

export default withNamespaces(["common"], { wait: true })(
  HomeScreen
);

const styles = StyleSheet.create({
    separator: {
      height: 5,
      backgroundColor: 'rgba(0, 0, 0, .08)',
    },
    header:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between', 
      backgroundColor:Colors.DARKBLUE, 
      padding:3,
      paddingHorizontal:8,
      borderColor:Colors.GREEN,
      borderBottomWidth:4
    },
    icon: {
      position:'absolute', 
      right:8, 
      backgroundColor:Colors.PINK, 
      justifyContent:'center', 
      alignItems:'center', 
      width:28, 
      height:28, 
      borderRadius:14, 
      top:2
    }
});
