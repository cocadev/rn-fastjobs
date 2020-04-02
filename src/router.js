import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Actions, Scene, Router } from 'react-native-router-flux'
import  AdminNavigator  from '../navigation/AdminNavigator';
import Login from '../screens/Login';
import DetailScreen from '../screens/DetailScreen';
import Signup from '../screens/Signup';
import AddEmployee from '../screens/AddEmployee';
import CreateDepartment from '../screens/CreateDepartment';
import Area from '../screens/Area';
import UserManagement from '../screens/UserManagement';
import OrganizationStructure from '../screens/OrganizationStructure';
import JobsAds from '../screens/JobsAds';
import JobDetails from '../screens/JobDetails';
import ListApplicant from '../screens/ListApplicant';
import MyFavorite from '../screens/MyFavourite';
import CreateJobAds from '../screens/CreateJobAds';
import QRCodeScan from '../screens/Qrcode';
import SearchUser from '../screens/SearchUser';
import Approvers from '../screens/Approvers';
// import Language from '../screens/Language';

import { withNamespaces } from "react-i18next";
import i18n from "../utils/i18n";
import SeekerNavigator from '../navigation/SeekerNavigator';
import Test from '../screens/test';
import ProfileSkills from '../screens/ProfileSkills';
import ProfileSkillsAdd from '../screens/ProfileSkillsAdd';
import ProfileEducations from '../screens/ProfileEducations';
import ProfileEducationAdd from '../screens/ProfileEducationAdd';
import ProfileExperiences from '../screens/ProfileExperiences';
import ProfileExperienceAdd from '../screens/ProfileExperienceAdd';
import ProfileContact from '../screens/ProfileContact';
import ProfileAboutMe from '../screens/ProfileAboutMe';
import Colors from '../constants/Colors';
import RegisterForPushNotifications from '../screens/registerForPushNotifications';
import FilterLocation from '../screens/FilterLocation';
import FilterRateType from '../screens/FilterRateType';
import EmployerProfile from '../screens/EmployerProfile';

export default class App extends React.Component {

  state = {
    isLoadingComplete: false,
  };

  render() {

    const WrappedStack = ({ t }) => <Router scenes={scenes} screenProps={{ t }} />;
    
    const ReloadAppOnLanguageChange = withNamespaces("common", {
      bindI18n: "languageChanged",
      bindStore: false
    })(WrappedStack);

    const scenes = Actions.create(
      <Scene key="root">
        <Scene key="login" component={Login} hideNavBar initial={false} />
        <Scene key="signup" component={Signup} hideNavBar initial={false} />

        <Scene key="main" component={AdminNavigator} hideNavBar initial={false} />
        <Scene key="seeker" component={SeekerNavigator} hideNavBar initial={false} />

        <Scene key="detail" component={DetailScreen} hideNavBar initial={false} />
        <Scene key="addemployee" component={AddEmployee} hideNavBar initial={false} />
        <Scene key="createdepartment" component={CreateDepartment} hideNavBar initial={false} />
        <Scene key="area" component={Area} hideNavBar initial={false} />

        <Scene key="usermanagement" component={UserManagement} hideNavBar initial={false} />
        <Scene key="organizationstructure" component={OrganizationStructure} hideNavBar initial={false} />
        <Scene key="jobads" component={JobsAds} hideNavBar initial={false} />
        <Scene key="jobdetail" component={JobDetails} hideNavBar initial={false} />
        <Scene key="listapplicant" component={ListApplicant} hideNavBar initial={false} />
        <Scene key="myfav" component={MyFavorite} hideNavBar initial={false} />
        <Scene key="createjob" component={CreateJobAds} hideNavBar initial={false} />
        <Scene key="qrcode" component={QRCodeScan} hideNavBar initial={false} />
        <Scene key="searchuser" component={SearchUser} hideNavBar initial={false} />
        <Scene key="approvers" component={Approvers} hideNavBar initial={false} />
        {/* <Scene key="language" component={Language} hideNavBar initial={false} /> */}
        <Scene key="test" component={Test} hideNavBar initial={false} />
        <Scene key="profileSkills" component={ProfileSkills} hideNavBar initial={false} />
        <Scene key="profileSkillsAdd" component={ProfileSkillsAdd} hideNavBar initial={false} />
        <Scene key="profileEducations" component={ProfileEducations} hideNavBar initial={false} />
        <Scene key="profileEducationAdd" component={ProfileEducationAdd} hideNavBar initial={false} />
        <Scene key="profileExperience" component={ProfileExperiences} hideNavBar initial={false} />
        <Scene key="profileExperienceAdd" component={ProfileExperienceAdd} hideNavBar initial={false} />
        <Scene key="profilecontact" component={ProfileContact} hideNavBar initial={false} />
        <Scene key="profileaboutme" component={ProfileAboutMe} hideNavBar initial={false} />
        {/* <Scene key="registerForPushNotifications" component={RegisterForPushNotifications} hideNavBar initial={true} /> */}

        <Scene key="filterlocation" component={FilterLocation} hideNavBar initial={false} />
        <Scene key="filterratetype" component={FilterRateType} hideNavBar initial={false} />
        <Scene key="employerProfile" component={EmployerProfile} hideNavBar initial={false} />

      </Scene>
    );

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle='default'/>}
          {Platform.OS === 'android' && <StatusBar backgroundColor={Colors.DARK}/>}

          {this.state.isLoadingComplete == true ? <ReloadAppOnLanguageChange /> : <Text>Loading.............</Text>}
          
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('../assets/images/robot-dev.png'),
        require('../assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
