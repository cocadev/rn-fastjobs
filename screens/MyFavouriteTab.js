import React from 'react';
import Header from '../components/Header';
import FavoriteItem from '../components/FavoriteItem';
import { ScrollView, View, KeyboardAvoidingView, FlatList } from 'react-native';
import { i } from '../constants/Style';
import { FEEDBACK } from '../constants/Staticdata';
import { withNamespaces } from "react-i18next";

class MyFavoriteTab extends React.Component {

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
    <FavoriteItem item={item} check={true}/>
  );

  render() {
    const { t } = this.props;
    return (
      <KeyboardAvoidingView style={i.container} behavior={"padding"} >

        <Header title={t("header:myfavorite")}  />

        <ScrollView>

            <View style={{flex:1, marginBottom: 2,}}>
              <FlatList
                data={FEEDBACK}
                keyExtractor={(item, i) => String(i)}
                renderItem={this._renderItem}
              />
            </View>

        </ScrollView>

      </KeyboardAvoidingView>
    );
  }
}

export default withNamespaces(["common"], { wait: true })(
  MyFavoriteTab
);