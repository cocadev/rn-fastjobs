import React from 'react';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import { ScrollView, Text, View, TouchableOpacity, KeyboardAvoidingView, CheckBox, FlatList } from 'react-native';
import { i } from '../constants/Style';

import FavoriteItem from '../components/FavoriteItem';
import { FEEDBACK } from '../constants/Staticdata';
import { withNamespaces } from "react-i18next";

class MyFavorite extends React.Component {

  static navigationOptions = {
    header:null
  };

  constructor(props){
    super(props);
    this.state = {
      selectedTab: 0,
      check: false
    };
  }

  setTab = selectedTab => {
    this.setState({ selectedTab });
  };

  _renderItem = ({ item }) => (
    <FavoriteItem item={item} />
  );

  render() {
    const { t } = this.props;

    return (
      <KeyboardAvoidingView style={i.container} behavior={"padding"} >

        <Header title={t("header:myfavorite")} />

        <ScrollView>

            <View style={{flex:1, marginBottom: 2,}}>
              <FlatList
                data={FEEDBACK}
                keyExtractor={(item, i) => String(i)}
                renderItem={this._renderItem}
              />
            </View>

            <View style={{alignItems: 'center', flexDirection: 'row', margin: 6,}}>
              <CheckBox
                  value = { this.state.check }
                  onChange = {() => {this.setState({check: !this.state.check})} }
              />
              <Text style={{marginLeft: 4 }}>{t("title:select_all")}</Text>
            </View>

             <View style={{flexDirection: 'row'}}>

                <TouchableOpacity style={{backgroundColor:Colors.BLUE, alignItems: 'center', justifyContent:'center', height: 50, flex: 1, margin: 12, marginTop: 6,}}>
                  <Text style={{color: Colors.WHITE}}>{t("button:invite")}</Text>
                </TouchableOpacity>

              </View>

        </ScrollView>

      </KeyboardAvoidingView>
    );
  }
}

export default withNamespaces(["common"], { wait: true })(
  MyFavorite
);