import React from 'react';
import Colors from '../constants/Colors';
import MaterialTabs from 'react-native-material-tabs';
import JobsNewItem from '../components/JobsNewItem';
import JobsCurrentItem from '../components/JobsCurrentItem';

import { ScrollView, StyleSheet, View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';
import { i } from '../constants/Style';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { JOBS } from '../constants/Staticdata';
import { Actions } from 'react-native-router-flux';
import { withNamespaces } from "react-i18next";
import api from '../api'

class MyJobsScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      alljobs:null
    };
  }

  componentDidMount() {
    this.setState({ isWaiting: true })

    api.getAllJobs((err, res) => {
      console.log('--------[ res ]----------', res)
      if (err == null) {
        // Object.keys(res.employer).map(function (_) {
        //   console.log('**************************', res.employer[_])
        //   return Actions.main({ userId: res.employer[_] })
        // })

        this.setState({ isWaiting: false, alljobs: res.results })
      } else {
        this.setState({ isWaiting: false })
      }
    })
  }

  setTab = selectedTab => {
    this.setState({ selectedTab });
  };

  _renderItem1 = ({ item }) => (
    <JobsNewItem item={item} current={true} />
  );

  _renderItem2 = ({ item }) => (
    <JobsCurrentItem item={item} />
  );

  render() {

    const { selectedTab, alljobs } = this.state;
    const { t } = this.props;

    console.log('this.state.alljobs', alljobs)
    return (
      <ScrollView style={i.container}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="bell-outline" size={30} color={Colors.WHITE} />
          <View style={{ flex: 1, marginHorizontal: 8, position: 'relative', }}>
            <TextInput
              style={{ borderRadius: 4, backgroundColor: Colors.WHITE, padding: 2, paddingLeft: 8, }}
              placeholder={t("placeholder:search_job_ads")}
            />
            <View style={styles.icon}>
              <Ionicons name="md-search" size={24} color={Colors.WHITE} />
            </View>
          </View>
          <TouchableOpacity onPress={() => Actions.createjob()}>
            <MaterialCommunityIcons name="plus" size={30} color={Colors.WHITE} />
          </TouchableOpacity>
        </View>

        <MaterialTabs
          items={[t("other:new"), t("other:current"), t("other:closed")]}
          selectedIndex={this.state.selectedTab}
          onChange={this.setTab}
          barColor={Colors.WHITE}
          indicatorColor={Colors.PINK}
          activeTextColor={Colors.PINK}
          inactiveTextColor={Colors.GREY2}
        />

        {this.state.isWaiting && <Text>Loading...</Text>}
        {!this.state.isWaiting &&
          <View style={{ flex: 1, marginBottom: 28, }}>

            {selectedTab == 0 && <FlatList data={this.state.alljobs} keyExtractor={(item, i) => String(i)} renderItem={this._renderItem2} />}
            {selectedTab == 1 && <FlatList data={JOBS} keyExtractor={(item, i) => String(i)} renderItem={this._renderItem1} />}

          </View>}

      </ScrollView>
    );
  }
}

export default withNamespaces(["common"], { wait: true })(MyJobsScreen);


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.DARKBLUE,
    padding: 3,
    paddingHorizontal: 8,
    borderColor: Colors.GREEN,
    borderBottomWidth: 4,
    paddingVertical: 12,

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
  }
});
