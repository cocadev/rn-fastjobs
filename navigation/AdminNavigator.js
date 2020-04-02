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
import ChatScreen from '../screens/ChatScreen';
import MyJobsScreen from '../screens/MyJobsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DetailScreen from '../screens/DetailScreen';
import SettingScreen from '../screens/SettingScreen';
import InboxScreen from '../screens/InboxScreen';
import FavScreen from '../screens/MyFavouriteTab';
import NavTabBar from './TabBar/maintabbar'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../src/store/common/actions";
import EmployerProfile from '../screens/EmployerProfile';

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

const ChatsStack = createStackNavigator(
  {
    ChatScreen: ChatScreen,
  },
  {
    initialRouteName: 'ChatScreen',
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

const InboxStack = createStackNavigator(
  {
    InboxScreen: InboxScreen,
  },
  {
    initialRouteName: 'InboxScreen',
    navigationOptions: {
      header: null
    }
  }
);

const FavStack = createStackNavigator(
  {
    FavScreen: FavScreen,
  },
  {
    initialRouteName: 'FavScreen',
    navigationOptions: {
      header: null
    }
  }
);

const ProfileStack = createStackNavigator(
  {
    ProfileScreen: EmployerProfile,
  },
  {
    initialRouteName: 'ProfileScreen',
    navigationOptions: {
      header: null
    }
  }
);

const SettingStack = createStackNavigator(
  {
    SettingScreen: SettingScreen,
  },
  {
    initialRouteName: 'SettingScreen',
    navigationOptions: {
      header: null
    }
  }
);

const MainNavigator = createBottomTabNavigator(
  {
    // Homes: { screen: HomeStack },
    // Discovers: { screen: DiscoversStack },
    // Chats: { screen: ChatsStack },
    // MyJobs: { screen: MyJobsStack },
    // Profiles: { screen: ProfileStack }

    Profile: { screen: ProfileStack },
    MyJobs: { screen: MyJobsStack },
    // Inbox: { screen: InboxStack },

    // Fav: { screen: FavStack },

    Setting: { screen: SettingStack }
  },
  {
    initialRouteName: 'Profile',
    tabBarComponent: NavTabBar,
    tabBarPosition: 'bottom',
  }
);

class AdminNavigator extends React.Component {

  componentDidMount(){
    console.log('--------------userID----------------', this.props.userId)
    console.log('---------------token---------------', this.props.token)

    this.props.actions.setUser(this.props.userId, this.props.token)
  }
  
  render() {
    // console.log('*************', this.props.me)
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
)( AdminNavigator );
