import React from 'react';
import Colors from '../constants/Colors';

import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { i } from '../constants/Style';
import StarRating from 'react-native-star-rating';
import Header2 from '../components/Header2';
import { Actions } from 'react-native-router-flux';

const width = Dimensions.get('window').width;

export default class ProfileSkillsAdd extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.data && this.props.data.name,
      check: false,
      starCount: this.props.data ? this.props.data.ranking : 0,
    };
  }

  onStarRatingPress(rating) {
    console.log('rating', rating)
    this.setState({
      starCount: rating
    });
  }

  save = () => {

    if(!this.state.text){
      ToastAndroid.show('Skill Name can not be null !', ToastAndroid.SHORT);
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
            <TouchableOpacity onPress={()=>Actions.pop()}><Text style={{ color: '#fff' }}>Cancel</Text></TouchableOpacity>
          )}
          rightE={(
            <TouchableOpacity onPress={this.save}><Text style={{ color: '#fff' }}>Save</Text></TouchableOpacity>
          )}

        />

        <View style={{ margin: 12, }} >

          <View style={styles.row}>
            <Text style={{ fontSize: 17, color: Colors.DARKBLUE }}>Skill Name</Text>

            <TextInput
              style={{ height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, width: width - 36 }}
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
            />

          </View>

          <View style={{width: width/2.5}}>
            <StarRating
              disabled={false}
              enabled={true}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              maxStars={5}
              starStyle={{ paddingHorizontal: 1, marginHorizontal: 1, marginTop: 12 }}
              starSize={25}
              rating={this.state.starCount}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
              fullStarColor={'#fcb040'}
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
