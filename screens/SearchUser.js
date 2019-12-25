import React from 'react';
import Colors from '../constants/Colors';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions, KeyboardAvoidingView, Modal, FlatList, Image, TextInput } from 'react-native';
import { i } from '../constants/Style';
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { Actions, } from 'react-native-router-flux';
import { FEEDBACK4 } from '../constants/Staticdata';
import MaterialTabs from 'react-native-material-tabs';
import UserPayListItem from '../components/UserPayListItem';
import { withNamespaces } from "react-i18next";

const width = Dimensions.get('window').width;

class SearchUser extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      check: false,
      modalCompleteVisible: false,
      approvers:[]
    };
  }

  setTab = selectedTab => {
    this.setState({ selectedTab });
  };

  _renderItem = ({ item }) => (
    <UserPayListItem item={item} />
  );

  renderCompleteModal() {
    const {t} = this.props
    return (
      <Modal
        visible={this.state.modalCompleteVisible}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modal, {height:width/1.7}]}>

            <Text style={{fontSize:17}}>{t('other:complete_send_for_approval')} </Text>

            <View style={{flexDirection: 'row', marginVertical: 6,}}>
              <Text style={{fontSize:15}}>Approver(s) </Text>
              <Text style={{fontSize:13, color:Colors.GREY2, marginLeft: 5,}}> {t('other:the_approval_flow_is_not_setup_yet')}  </Text>
            </View>

            <View style={{flexDirection:'row'}}>
              {this.state.approvers.map((item,i) => 
              <View style={{padding:5, borderRadius:4, borderColor:'#ddd', borderWidth:1, marginHorizontal:4, justifyContent:'center', alignItems:'center'}}>
                 <Text key={i}>{item}</Text>
              </View>)}
            </View>

            <TouchableOpacity 
                style={{flexDirection: 'row', marginVertical: 10 }} 
                onPress={()=>{ 
                  Actions.approvers({update:(approver)=>{
                    this.setState({modalCompleteVisible:true})

                    var newArray = this.state.approvers.slice();    
                    newArray.push(approver);   
                    this.setState({approvers:newArray})

                  }});
                  this.setState({modalCompleteVisible:false})
                }}>
               <EvilIcons name="plus" size={40} color={Colors.GREY1} />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 12, }}>

              <TouchableOpacity style={styles.modalBtn} onPress={() => this.setState({ modalCompleteVisible: false })}>
                <Text style={{ color: Colors.WHITE }}> {t("button:cancel")} </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalBtn} >
                <Text style={{ color: Colors.WHITE }}> {t("button:send_to_approval")}</Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const {t} = this.props
    return (
      <KeyboardAvoidingView style={i.container} behavior={"padding"} >

        <View style={styles.header}>
          <TouchableOpacity onPress={() => Actions.pop()} style={{ position: 'absolute', left: 12 }}>
            <Ionicons name="ios-arrow-dropleft" size={32} color={Colors.WHITE} />
          </TouchableOpacity>
          <View style={{ flex: 1, marginHorizontal: 32, marginLeft:40, position: 'relative' }}>
            <TextInput
              style={{ borderRadius: 4, backgroundColor: Colors.WHITE, padding: 2, paddingLeft: 8, }}
              placeholder={t("placeholder:search_name")}
            />
            <View style={styles.icon}>
              <Ionicons name="md-search" size={24} color={Colors.WHITE} />
            </View>
          </View>
        </View>

        <ScrollView>

          <MaterialTabs
            items={[t("other:sort_by"), t("other:name"), t("other:hours"), t("other:wages")]}
            selectedIndex={this.state.selectedTab}
            onChange={this.setTab}
            barColor={Colors.WHITE}
            indicatorColor={Colors.GREEN}
            activeTextColor={Colors.DARK}
            inactiveTextColor={Colors.GREY2}
            textStyle={{ fontSize: 12 }}
          />

          <View style={{ flex: 1, marginBottom: 2, }}>
            <FlatList
              data={FEEDBACK4}
              keyExtractor={(item, i) => String(i)}
              renderItem={this._renderItem}
            />
            <View style={{flexDirection:'row', justifyContent:'flex-end', padding: 20,}}>
              <Text style={{fontSize:18, color:Colors.GREY1, fontWeight:'bold'}}>{t("other:total")} :</Text>
              <Text style={{fontSize:18, color:Colors.PINK, fontWeight:'bold'}}> 265.00</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity onPress={()=>this.setState({modalCompleteVisible:true})} style={{ backgroundColor: Colors.BLUE, alignItems: 'center', justifyContent: 'center', height: 50, flex: 1, margin: 12, marginTop: 6, }}>
              <Text style={{ color: Colors.WHITE }}>{t("button:complete_send_for_approval")}</Text>
            </TouchableOpacity>

          </View>

          {this.renderCompleteModal()}

        </ScrollView>

      </KeyboardAvoidingView>
    );
  }
}

export default withNamespaces(["common"], { wait: true })( SearchUser );

const styles = StyleSheet.create({

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomColor: Colors.GREY2,
    borderBottomWidth: 1,
    fontSize: 16,
    paddingLeft: 6,
    marginTop: 3,
    marginBottom: 5,
  },

  text: {
    color: Colors.GREY
  },

  statusText: {
    position: 'absolute',
    right: 5,
    color: Colors.Orange,
    fontSize: 18,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.DARKBLUE,
    padding: 3,
    paddingVertical:12,
    paddingHorizontal: 8,
    borderColor: Colors.GREEN,
    borderBottomWidth: 4
  },

  icon: {
    position:'absolute', 
    right:8, 
    backgroundColor:Colors.PINK, 
    justifyContent:'center', 
    alignItems:'center', 
    width:28, 
    height:28, 
    borderRadius:14, 
    top:2
  },

  
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    alignItems: "center",
    justifyContent: "center"
  },

  modal: {
    width: width - 40,
    height: width / 2.2,
    borderRadius: 5,
    shadowColor: "black",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    backgroundColor: "white"
  },

  modalBtn: {
    padding: 5,
    marginHorizontal: 6,
    backgroundColor: Colors.BLUE,
    width: 140,
    justifyContent:'center',
    borderRadius: 5,
    alignItems: 'center',
  },


});
