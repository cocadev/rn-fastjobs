/* eslint-disable no-restricted-syntax */
/* eslint-disable no-labels */
/* eslint-disable no-unused-labels */
/* eslint-disable react/prop-types */
import * as React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack';
import { View } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import MyJobsScreen from '../screens/MyJobsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DetailScreen from '../screens/DetailScreen';
import SeekerNavTabBar from './TabBar/seekertabbar'

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../src/store/common/actions";

const HomeStack = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    Detail : DetailScreen
  },
  {
    initialRouteName: 'HomeScreen',
    navigationOptions: {
      header: null
    }
  }
);

const DiscoversStack = createStackNavigator(
  {
    DiscoverScreen: DiscoverScreen,
  },
  {
    initialRouteName: 'DiscoverScreen',
    navigationOptions: {
      header: null
    }
  }
);

const MyJobsStack = createStackNavigator(
  {
    MyJobsScreen: MyJobsScreen,
  },
  {
    initialRouteName: 'MyJobsScreen',
    navigationOptions: {
      header: null
    }
  }
);

const ProfileStack = createStackNavigator(
  {
    ProfileScreen: ProfileScreen,
  },
  {
    initialRouteName: 'ProfileScreen',
    navigationOptions: {
      header: null
    }
  }
);

const MainNavigator = createBottomTabNavigator(
  {
    Homes: { screen: HomeStack },
    Discovers: { screen: DiscoversStack },
    MyJobs: { screen: MyJobsStack },
    Profile: { screen: ProfileStack },
  },
  {
    initialRouteName: 'Homes',
    tabBarComponent: SeekerNavTabBar,
    tabBarPosition: 'bottom',
  }
);

class SeekerNavigator extends React.Component {

  componentDidMount(){
    console.log('---------------userId---------------', this.props.userId)
    this.props.actions.setUser(this.props.userId)
  }
  
  render() {
      return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <MainNavigator />
        </View>
      )
  }
}

export default connect(
  state => ({
      me:state.common.me,
  }),
  dispatch => ({
      actions: bindActionCreators(actions, dispatch)
  })
)( SeekerNavigator );
