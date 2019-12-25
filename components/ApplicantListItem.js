import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, CheckBox } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import StarRating from 'react-native-star-rating';

const width = Dimensions.get('window').width;

export default class ApplicantListItem extends React.Component {

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
    const { item } = this.props;
    return (
        <TouchableOpacity style={{backgroundColor:Colors.WHITE, marginTop:6 }}>

          <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 6,}}>
              <CheckBox
                  value = { this.state.check }
                  onChange = {() => {this.setState({check: !this.state.check})} }
              />
              <Text style={{color:Colors.BLUE, fontSize:17, fontWeight:'600'}}>{item.name}</Text>
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

            <View style={{ flex:2, alignItems:'flex-end' }}>
              <Text style={{color:Colors.GREY1, fontSize:18, fontWeight:'600', paddingRight: 20,}}> Reject  |  Accept </Text>
            </View>

          </View>
        </TouchableOpacity>
    )
  }
}
