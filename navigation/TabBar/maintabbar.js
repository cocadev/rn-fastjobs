import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { Ionicons, SimpleLineIcons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { withNamespaces } from "react-i18next";

class MainTabBar extends Component {
  
  render() {
    const { navigate, state } = this.props.navigation;
    const { index, routes } = state;
    const active = routes[index].key;
    const { t } = this.props;

    return (
      <View style={styles.container}>

        {/* <TouchableWithoutFeedback onPress={() => navigate('Homes')}>

          <View style={active === 'Homes' ? styles.active : styles.nonactive}>
            <MaterialCommunityIcons name="home" size={25} color={active === 'Homes' ? Colors.WHITE : Colors.WHITE} />
            <Text style={[active === 'Homes' ? {color:Colors.WHITE} : {color:Colors.WHITE}, {fontSize:10}]}>Home</Text>
          </View>
          
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigate('Discovers')}>

          <View style={active === 'Discovers' ? styles.active : styles.nonactive}>
            <MaterialCommunityIcons name="compass-outline" size={25} color={active === 'Discovers' ? Colors.WHITE : Colors.WHITE} />
            <Text style={[active === 'Discovers' ? {color:Colors.WHITE} : {color:Colors.WHITE}, {fontSize:10}]}>Discover</Text>
          </View>
            
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigate('Chats')}>
          <View style={active === 'Chats' ? styles.active : styles.nonactive}>
            <MaterialCommunityIcons name="wechat" size={25} color={active === 'Chats' ? Colors.WHITE : Colors.WHITE} />
            <Text style={[active === 'Chats' ? {color:Colors.WHITE} : {color:Colors.WHITE}, {fontSize:10}]}>Chats</Text>
          </View>
        </TouchableWithoutFeedback> */}

        <TouchableWithoutFeedback onPress={() => navigate('Profile')}>
          <View style={active === 'Profile' ? styles.active : styles.nonactive}>
            <SimpleLineIcons name="user" size={22} color={active === 'Profile' ? Colors.WHITE : Colors.WHITE}/>
            <Text style={[active === 'Profile' ? {color:Colors.WHITE} : {color:Colors.WHITE}, {fontSize:16, marginLeft: 4,}]}>{t("tab:profile")}</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigate('MyJobs')}>
          <View style={active === 'MyJobs' ? styles.active : styles.nonactive}>
            <Ionicons name="md-paper" size={22} color={active === 'MyJobs' ? Colors.WHITE : Colors.WHITE}/>
            <Text style={[active === 'MyJobs' ? {color:Colors.WHITE} : {color:Colors.WHITE}, {fontSize:16, marginLeft: 4,}]}>{t("tab:myjobs")}</Text>
          </View>
        </TouchableWithoutFeedback>

        {/* <TouchableWithoutFeedback onPress={() => navigate('Inbox')}>
          <View style={active === 'Inbox' ? styles.active : styles.nonactive}>
            <Ionicons name="md-paper" size={22} color={active === 'Inbox' ? Colors.WHITE : Colors.WHITE}/>
            <Text style={[active === 'Inbox' ? {color:Colors.WHITE} : {color:Colors.WHITE}, {fontSize:16, marginLeft: 4,}]}>{t("tab:inbox")}</Text>
          </View>
        </TouchableWithoutFeedback> */}

        {/* <TouchableWithoutFeedback onPress={() => navigate('Fav')}>
          <View style={active === 'Fav' ? styles.active : styles.nonactive}>
            <MaterialIcons name="favorite-border" size={22} color={active === 'Fav' ? Colors.WHITE : Colors.WHITE}/>
            <Text style={[active === 'Fav' ? {color:Colors.WHITE} : {color:Colors.WHITE}, {fontSize:16, marginLeft: 4,}]}>{t("tab:favorite")}</Text>
          </View>
        </TouchableWithoutFeedback> */}

        <TouchableWithoutFeedback onPress={() => navigate('Setting')}>
          <View style={active === 'Setting' ? styles.active : styles.nonactive}>
            <MaterialCommunityIcons name="compass-outline" size={22} color={active === 'Setting' ? Colors.WHITE : Colors.WHITE}/>
            <Text style={[active === 'Setting' ? {color:Colors.WHITE} : {color:Colors.WHITE}, {fontSize:16, marginLeft: 4,}]}>Setting</Text>
          </View>
        </TouchableWithoutFeedback>

      </View>
    );
  }
}

MainTabBar.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default withNamespaces(["common"], { wait: true })(
  MainTabBar
);