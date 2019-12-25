import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { withNamespaces } from "react-i18next";

class SeekerTabBar extends Component {
  
  render() {
    const { navigate, state } = this.props.navigation;
    const { index, routes } = state;
    const active = routes[index].key;
    const { t } = this.props;

    return (
      <View style={styles.container}>

        <TouchableWithoutFeedback onPress={() => navigate('Homes')}>

          <View style={active === 'Homes' ? styles.active : styles.nonactive}>
            <MaterialCommunityIcons name="home" size={25} color={active === 'Homes' ? Colors.WHITE : Colors.WHITE} />
            <Text style={[active === 'Homes' ? {color:Colors.WHITE} : {color:Colors.WHITE}, {fontSize:16, marginLeft: 4,}]}>{t("tab:home")}</Text>
          </View>
          
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigate('Discovers')}>

          <View style={active === 'Discovers' ? styles.active : styles.nonactive}>
            <MaterialCommunityIcons name="compass-outline" size={25} color={active === 'Discovers' ? Colors.WHITE : Colors.WHITE} />
            <Text style={[active === 'Discovers' ? {color:Colors.WHITE} : {color:Colors.WHITE}, {fontSize:16, marginLeft: 4,}]}>{t("tab:discover")}</Text>
          </View>
            
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigate('MyJobs')}>
          <View style={active === 'MyJobs' ? styles.active : styles.nonactive}>
            <Ionicons name="md-paper" size={22} color={active === 'MyJobs' ? Colors.WHITE : Colors.WHITE}/>
            <Text style={[active === 'MyJobs' ? {color:Colors.WHITE} : {color:Colors.WHITE}, {fontSize:16, marginLeft: 4,}]}>{t("tab:myjobs")}</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigate('Profile')}>
          <View style={active === 'Profile' ? styles.active : styles.nonactive}>
            <SimpleLineIcons name="user" size={22} color={active === 'Profile' ? Colors.WHITE : Colors.WHITE}/>
            <Text style={[active === 'Profile' ? {color:Colors.WHITE} : {color:Colors.WHITE}, {fontSize:16, marginLeft: 4,}]}>{t("tab:profile")}</Text>
          </View>
        </TouchableWithoutFeedback>



      </View>
    );
  }
}

SeekerTabBar.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default withNamespaces(["common"], { wait: true })(
  SeekerTabBar
);