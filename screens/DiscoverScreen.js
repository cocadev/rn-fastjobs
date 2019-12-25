import React from 'react';
import Colors from '../constants/Colors';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, FlatList, TextInput, ImageBackground, Picker } from 'react-native';
import { i } from '../constants/Style';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, EvilIcons, FontAwesome, Entypo } from "@expo/vector-icons";
import { JOBS } from '../constants/Staticdata';
import { pic } from '../constants/Image';
import Carousel from 'react-native-banner-carousel';
import { withNamespaces } from "react-i18next";
import api from '../api'
import UtilService from '../utils/utils'
import { Actions } from 'react-native-router-flux';

const width = Dimensions.get('window').width;

class DiscoverScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      alljobs: [],
      location_counts: 'All',
      filter_location: null,
      filter_name: "",
      filter_jobType: null,
      filter_rate: 5,
      isWaiting: false
    }
  }

  componentDidMount() {
    const { filter_location, filter_name, filter_jobType, filter_rate } = this.state
    this.getData( filter_location, filter_name, filter_jobType, filter_rate )
  }

  getData(location, name, jobType, rate) {
    this.setState({isWaiting: true})
    console.log(' ----- final ------- 1', location)
    console.log(' ----- final ------- 2', name)
    console.log(' ----- final ------- 3', jobType)
    console.log(' ----- final ------- 4', rate)

    const filterd = []
    api.getAllJobs((err, res) => {
      if (err == null) {
        // this.setState({isWaiting:false})
        console.log('Got it')
        Object.keys(res.results).map(function (_) {
          filterd.push(res.results[_])
        })

        console.log('**************************************888 all jobs *********************', filterd)

        this.setState({
          alljobs: filterd.filter(
            d => ( location ? location.includes(d.employer.location) : true )
                 &&
                 (
                    ( jobType ? jobType.includes(d.job_type) : true)
                    && 
                    (
                      (d.job_name.includes(name))
                      &&
                      (d.rate > parseInt(rate))
                    )
                    
                 )
        ),isWaiting: true})

      } else {
        this.setState({ isWaiting: false })
        console.log('err', err)
      }
    })
  }

  _renderItem = ({ item }) => (
    <View style={{ backgroundColor: Colors.WHITE, paddingLeft: 10, marginTop: 6 }}>
      <Text style={{ color: Colors.BLUE, fontSize: 17, marginLeft: 12, marginTop: 12, fontWeight: '600' }}>{item.job_name}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
        <Entypo name="location-pin" size={20} color={Colors.GREY1} />
        <Text style={{ color: Colors.GREY2 }}>employer location</Text>
      </View>

      <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 12, marginVertical: 10, }}>
        <Image source={{ uri: "https://www.cmcautomobiles.co.tz/cmc/wp-content/uploads/2017/06/index.png" }} style={{ flex: 1, width: 50, height: 45, borderRadius: 4, borderWidth: 1, borderColor: Colors.GREY2 }} />
        <View style={{ flex: 3, marginLeft: 12 }}>
          <Text style={{ color: Colors.GREY1, fontSize: 15 }}>employer name</Text>
          <Text style={{ color: Colors.GREY1 }}>Posted {UtilService.getDayTime(item.created_date) + ' (' + item.job_type + ' )'}</Text>
        </View>
        <View style={{ flex: 2, marginLeft: 12 }}>
          <Text style={{ color: Colors.PINK, fontSize: 17, fontWeight: '600' }}>RM{item.request_vacancy}</Text>
          <Text>{item.rate + '/ hour'}</Text>
        </View>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#f1f1f1' }}>
        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 6, }}>
          <FontAwesome name="star-o" size={20} color={Colors.GREY} style={{ marginHorizontal: 6 }} />
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 4, }}>
          <FontAwesome name="share-square-o" size={20} color={Colors.GREY} style={{ marginHorizontal: 6 }} />
          <Text>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  _ItemSeparator = () => <View style={styles.separator} />;

  _onLocationFilter = (x) => {
    this.setState({
      filter_location: x,
      location_counts: x ? ( x.length + ' selected.' ) : 'All'
    })
    this.getData(x, this.state.filter_name, this.state.filter_jobType, this.state.filter_rate)
  }

  _onJobTypeFilter = (x, y) => {
    console.log('filter_jobType', x)
    console.log('filter_rate', y)

    this.setState({ filter_jobType: x, filter_rate: y })
    // this.getData(this.state.filter_location, this.state.filter_name, x, y)
    this.getData(this.state.filter_location, this.state.filter_name, x, y)

  }

  render() {
    const { t } = this.props
    const { filter_location, filter_name, alljobs, filter_jobType, filter_rate } = this.state
    // console.log('************ alljobs ************', alljobs)
    return (
      <View style={i.container}>

        <View style={styles.header}>
          <EvilIcons name="arrow-left" size={32} color={Colors.WHITE} />
          <View style={{ flex: 1, marginHorizontal: 8, position: 'relative' }}>
            <TextInput
              style={{ borderRadius: 4, backgroundColor: Colors.WHITE, padding: 2, paddingLeft: 8, }}
              onChangeText={(filter_name) => {
                this.setState({ filter_name })
                this.getData(filter_location, filter_name, filter_jobType, filter_rate)
              }}
              value={this.state.filter_name}
              placeholder={'Search FastJobs'}
            />

            {this.state.filter_name.length > 0 &&
              <TouchableOpacity
                style={styles.cross}
                onPress={() => { this.setState({ filter_name: '' }); this.getData(filter_location, "", filter_jobType, filter_rate) }}
              >
                <EvilIcons name="close-o" size={24} color={Colors.BLACK} />
              </TouchableOpacity>
            }

            <View style={styles.icon}>
              <Ionicons name="md-search" size={24} color={Colors.WHITE} />
            </View>
          </View>
          <MaterialCommunityIcons name="bell-outline" size={30} color={Colors.WHITE} />
        </View>

        <View style={{ flexDirection: 'row', paddingHorizontal: 8, paddingTop: 8, paddingBottom: 4, backgroundColor: '#ecf0f3' }}>
          <TouchableOpacity
            style={{ flex: 1, borderRightWidth: 1, borderRightColor: '#555' }}
            onPress={() => Actions.filterlocation({ update: (i) => this._onLocationFilter(i), filter_location: this.state.filter_location })}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Entypo name="location-pin" size={16} color={Colors.GREY1} />
              <Text style={{ color: Colors.GREY1, fontSize: 10 }}>{t("title:location")}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 6, alignItems: 'center' }}>
              <Text>{this.state.location_counts}</Text>
              <Entypo name="triangle-down" size={16} color={Colors.GREY1} />
            </View>
          </TouchableOpacity>
          {/* <View style={{flex:1,paddingLeft:12,  borderRightColor:Colors.GREY2, borderRightWidth:1,  borderLeftColor:Colors.GREY2, borderLeftWidth:1}}>
              <Text style={{color:Colors.GREY1, fontSize:10}}>{t("title:job_function")}</Text>
              <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:6, alignItems:'center'}}>
                  <Text>{t("title:all")}</Text>
                  <Entypo name="triangle-down" size={16} color={Colors.GREY1} />
              </View>
          </View> */}
          <TouchableOpacity style={{ flex: 1, paddingLeft: 12 }}
            onPress={() => Actions.filterratetype({ update: (i, j) => this._onJobTypeFilter(i, j), filter_jobType, filter_rate })}
          >
            <Text style={{ color: Colors.GREY1, fontSize: 10, }}>{t("title:filter")}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 1, alignItems: 'center' }}>
              <Text>{t("title:recency")}</Text>
              <Entypo name="triangle-down" size={16} color={Colors.GREY1} />
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.alljobs}
          keyExtractor={(item, i) => String(i)}
          renderItem={this._renderItem}
          extraData={this.state}

        />

        <View style={{ marginTop: 1 }}></View>

      </View>
    );
  }
}

export default withNamespaces(["common"], { wait: true })(DiscoverScreen);

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, .08)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.DARKBLUE,
    padding: 3,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderColor: Colors.GREEN,
    borderBottomWidth: 4
  },
  icon: {
    position: 'absolute',
    right: 8,
    backgroundColor: Colors.PINK,
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
    borderRadius: 14,
    top: 2
  },
  cross: {
    position: 'absolute',
    right: 35,
    top: 6
  }
});
