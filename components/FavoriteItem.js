import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image, CheckBox } from 'react-native';
import { Ionicons, Entypo } from "@expo/vector-icons";
import { t } from '../constants/Text';
import { Actions, Scene, Router } from 'react-native-router-flux'
import Colors from '../constants/Colors';
import StarRating from 'react-native-star-rating';

const width = Dimensions.get('window').width;

export default class FavoriteItem extends React.Component {

  constructor(){
    super();
    this.state={
      check: false,
      starCount: 3.5
    }
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
 
  render() {
    const { item, check } = this.props;
    return (
        <TouchableOpacity style={{backgroundColor:Colors.WHITE, marginTop:6 }}>

          <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 6,}}>

              {!check && <CheckBox value = { this.state.check } onChange = {() => {this.setState({check: !this.state.check})} } />}
              
              <Text style={{color:Colors.BLUE, fontSize:17, fontWeight:'600', marginLeft:30}}>{item.name}</Text>
          </View>

          <View style={{flexDirection:'row', marginLeft:30,}}>

            <View style={{ flex:1 }}>

              <View style={{flexDirection:'row', alignItems:'center', marginHorizontal:5}}>
                <Entypo name="location-pin" size={20} color={Colors.GREY1} />
                <Text style={{color:Colors.GREY2}}>{item.title}</Text>
              </View>

                <StarRating
                  disabled={true}
                  emptyStar={'ios-star-outline'}
                  fullStar={'ios-star'}
                  halfStar={'ios-star-half'}
                  iconSet={'Ionicons'}
                  maxStars={5}
                  starStyle={{paddingHorizontal: 1, marginHorizontal: 1,}}
                  starSize={20}
                  rating={this.state.starCount}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                  fullStarColor={'#fcb040'}
                />

            </View>

            <View style={{alignItems: 'center', flex:2}}>
              <Ionicons name="ios-heart" size={40} color={Colors.PINK}/>
            </View>

          </View>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
     box:{
       borderRadius:6,
       width:width/4.5,
       height:width/4,
       borderColor:Colors.GREY,
       borderWidth:1,
       justifyContent:'center',
       alignItems:'center',
     },
     boxIcon:{
       position:'absolute',
       right:7,
       bottom:35,
       zIndex:1,
       backgroundColor:Colors.BLUE, 
       borderRadius:18, 
       width:36, 
       height:36, 
       justifyContent:'center', 
       alignItems:'center',
     }
  });
  