import React from 'react';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal, Image, Dimensions, FlatList, KeyboardAvoidingView } from 'react-native';
import { i } from '../constants/Style';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { pic } from '../constants/Image';
import { Actions} from 'react-native-router-flux'
import { withNamespaces } from "react-i18next";

const width = Dimensions.get('window').width;

class ProfileEducations extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      check: false,
      starCount: 1,
      modalDelVisible: false,
      educations: null
    };
  }

  componentDidMount() {
    this.setState({
      educations: this.props.data
    })
  }

  _renderItem = ({ item }) => (
    <>
      <View style={styles.row}>
        <Text style={{ fontSize: 17, color: Colors.DARKBLUE }}>{item.name}</Text>
        <Text style={{ fontSize: 15,  }}>{item.title}</Text>
        <Text style={{ fontSize: 15,  }}>{item.start + ' - ' + item.end}</Text>

      </View>
      <View style={styles.actionView}>
        <TouchableOpacity 
          onPress={() => Actions.profileEducationAdd({ 
            title: 'Edit Education', 
            data: item,
           })} 
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="edit" size={20} color={Colors.GREY} />
          <Text> Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.setState({modalDelVisible:true})} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign name="delete" size={20} color={Colors.GREY} />
          <Text> Delete</Text>
        </TouchableOpacity>
      </View>
    </>
  )

  renderDelModal() {
    const { t } = this.props
    return (
      <Modal
        visible={this.state.modalDelVisible}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={i.modalContainer}>
          <View style={i.modal}>

            <Text > {t("title:delete_message")}? </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 12, }}>

              <TouchableOpacity style={i.modalBtn} onPress={() => this.setState({ modalDelVisible: false })}>
                <Text style={{ color: Colors.WHITE }}> {t("button:no")} </Text>
              </TouchableOpacity>

              <TouchableOpacity style={i.modalBtn}>
                <Text style={{ color: Colors.WHITE }}> {t("button:yes")} </Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <KeyboardAvoidingView style={i.container} behavior={"padding"} >

        <Header title={'Education'} />

        <ScrollView style={{ margin: 12, }} >

          <TouchableOpacity
            onPress={() => Actions.profileEducationAdd({ title: 'Add Education' })}
            style={{ flexDirection: 'row', alignItems: 'center', height: 50, flex: 1, marginTop: 2, borderBottomColor: Colors.GREY2, borderBottomWidth: 1, }}>
            <Image source={pic.plus_2} style={{ width: 34, height: 34 }} />
            <Text style={{ fontSize: 17, marginLeft: 12, color: Colors.GREY1 }}>Add Education</Text>
          </TouchableOpacity>


          <FlatList
            data={this.state.educations}
            keyExtractor={(item, i) => String(i)}
            renderItem={this._renderItem}
          />

          {this.renderDelModal()}

        </ScrollView>

      </KeyboardAvoidingView>
    );
  }
}

export default withNamespaces(["common"], { wait: true })(
  ProfileEducations
);

const styles = StyleSheet.create({
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.BACKGROUND,
    height: 54,
    padding: 3,
    paddingHorizontal: 8,
    borderColor: Colors.PINK,
    borderBottomWidth: 4
  },

  row: {
    height: 55,
    alignItems: 'flex-start',
    fontSize: 16,
    paddingLeft: 6,
    marginVertical: 10,
  },
  actionView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 7,
    borderBottomColor: Colors.GREY2,
    borderBottomWidth: 1,
    borderTopColor: Colors.GREY2,
    borderTopWidth: 1,
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

});
