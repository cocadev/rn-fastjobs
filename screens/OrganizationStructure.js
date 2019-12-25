import React from 'react';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import Header from '../components/Header';
import Box from '../components/Box';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal, Image, Dimensions, ImageBackground, Picker, TextInput, KeyboardAvoidingView, CheckBox } from 'react-native';
import { i } from '../constants/Style';
import { Ionicons, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { t } from '../constants/Text';
import { pic } from '../constants/Image';
import { withNamespaces } from "react-i18next";

const width = Dimensions.get('window').width;

class OrganizationStructure extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      check: false,
      modalVisible: false,
      editModalVisible: false,
      modalDelVisible: false
    };
  }

  renderIndicator() {
    const {t} = this.props
    return (
      <Modal
        visible={this.state.modalVisible}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>

            <Text> {t("other:enter_department_name")}</Text>

            <TextInput
              style={styles.input}
              placeholder={t("placeholder:department_name")}
              onChangeText={(company_name) => this.setState({ company_name })}
              value={this.state.company_name}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 12, }}>

              <TouchableOpacity style={styles.modalBtn} onPress={() => this.setState({ modalVisible: false })}>
                <Text style={{ color: Colors.WHITE }}> {t("button:cancel")}: </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalBtn}>
                <Text style={{ color: Colors.WHITE }}> {t("button:ok")}:</Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </Modal>
    );
  }

  renderEditModal() {
    const {t} = this.props
    return (
      <Modal
        visible={this.state.editModalVisible}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>

            <Text >{t("other:edit_department")}</Text>

            <TextInput
              style={styles.input}
              placeholder={t("placeholder:department_name")}
              onChangeText={(company_name) => this.setState({ company_name })}
              value={this.state.company_name}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 12, }}>

              <TouchableOpacity onPress={()=>this.setState({modalDelVisible:true})} style={styles.modalBtn}>
                <Text style={{ color: Colors.WHITE }}> {t("button:delete")} </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalBtn} onPress={() => this.setState({ editModalVisible: false })}>
                <Text style={{ color: Colors.WHITE }}> {t("button:cancel")} </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalBtn}>
                <Text style={{ color: Colors.WHITE }}> {t("button:ok")} </Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </Modal>
    );
  }

  renderDelModal() {
    const {t} = this.props
    return (
      <Modal
        visible={this.state.modalDelVisible}
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={styles.modalContainer}>
             <View style={styles.modal}>
                
                  <Text > {t("other:delete_department")}</Text>  

                  <View style={{flexDirection:'row', justifyContent:'space-around',  width:'100%', marginTop: 12,}}>

                      <TouchableOpacity style={styles.modalBtn} onPress={()=>this.setState({modalDelVisible:false})}>
                           <Text style={{color:Colors.WHITE}}> {t("button:no")} </Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.modalBtn}>
                          <Text style={{color:Colors.WHITE}}> {t("button:yes")} </Text>
                      </TouchableOpacity>

                  </View>

            </View>
        </View>
      </Modal>
    );
  }

  render() {
    const { t }= this.props
    return (
      <KeyboardAvoidingView style={i.container} behavior={"padding"} >

        <Header title={'Organization Structure'} />

        <ScrollView style={{ margin: 12, }} >

          <TouchableOpacity
            onPress={() => this.setState({ modalVisible: true, company_name: "" })}
            style={{ flexDirection: 'row', alignItems: 'center', height: 50, flex: 1, marginTop: 2, borderBottomColor: Colors.GREY2, borderBottomWidth: 1, }}>
            <Image source={pic.plus_2} style={{ width: 34, height: 34 }} />
            <Text style={{ fontSize: 17, marginLeft: 12, color: Colors.GREY1 }}>{t("other :create_department")}:</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => this.setState({ editModalVisible: true, company_name: "HR" })} >
            <Text style={{ fontSize: 17 }}>Banquet (0)</Text>
            <Entypo name="chevron-small-right" size={32} color={Colors.GREY2} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => this.setState({ editModalVisible: true, company_name: "Professional" })} >
            <Text style={{ fontSize: 17 }}>Executive Office (0)</Text>
            <Entypo name="chevron-small-right" size={32} color={Colors.GREY2} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => this.setState({ editModalVisible: true, company_name: "Sales & Marketing" })} >
            <Text style={{ fontSize: 17 }}>Sales (0)</Text>
            <Entypo name="chevron-small-right" size={32} color={Colors.GREY2} />
          </TouchableOpacity>

          {this.renderIndicator()}
          {this.renderEditModal()}
          {this.renderDelModal()}

        </ScrollView>



      </KeyboardAvoidingView>
    );
  }
}

export default withNamespaces(["common"], { wait: true })( OrganizationStructure );


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
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Colors.GREY2,
    borderBottomWidth: 1,
    fontSize: 16,
    paddingLeft: 6,
    marginVertical: 10,
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 16,
    paddingLeft: 12,
    marginVertical: 10,
    borderRadius: 5,
    margin: 20,
    marginTop: 25,
    width: '90%'
  },
  modalBtn: {
    padding: 5, 
    marginHorizontal: 6, 
    backgroundColor: Colors.BLUE, 
    width: 70, 
    borderRadius: 5, 
    alignItems: 'center',
  }
});
