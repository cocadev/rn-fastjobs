import React from 'react';
import Colors from '../constants/Colors';
import JobsCurrentItem from '../components/JobsCurrentItem';

import { ScrollView, StyleSheet, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { i } from '../constants/Style';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { JOBS } from '../constants/Staticdata';
import { Actions } from 'react-native-router-flux';
import { withNamespaces } from "react-i18next";

class InboxScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  _renderItem2 = ({ item }) => (
    <JobsCurrentItem item={item} manager={true}/>
  );

  render() {
    const { selectedTab } = this.state;
    const { t } = this.props;
    console.log('selectedTab', selectedTab)
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

        <View style={{ flex: 1, marginBottom: 28, }}>

          <FlatList
            data={JOBS}
            keyExtractor={(item, i) => String(i)}
            renderItem={this._renderItem2}
          />

        </View>

      </ScrollView>
    );
  }
}

export default withNamespaces(["common"], { wait: true })( InboxScreen );

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
