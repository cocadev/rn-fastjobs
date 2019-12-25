import React from 'react';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, KeyboardAvoidingView, Modal, TextInput } from 'react-native';
import { i } from '../constants/Style';
import { pic } from '../constants/Image';
import { Actions } from 'react-native-router-flux'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { withNamespaces } from "react-i18next";
import UtilService from '../utils/utils';

const width = Dimensions.get('window').width;

class JobDetails extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      check: false,
      modalConfirmVisible: false,
      modalScheduleVisible: false,
      modalScanTimeVisible: false,
      modalScanTimeVisible: false,
      modalUserVisible: false,
      scaned: false,

      start: new Date(),
      end: new Date(),

      img:'http://www.mdcleaners.com/wp-content/uploads/2016/11/nouser-1.jpg',

      isDateTimePickerVisible1: false,
      isDateTimePickerVisible2: false,
    };
  }

  _showDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: true });
  _showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: true });

  _hideDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: false });
  _hideDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: false });

  _handleDatePicked1 = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({ start: date });
    this._hideDateTimePicker1();
  };

  _handleDatePicked2 = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({ end: date });
    this._hideDateTimePicker2();
  };

  userInfo() {
    const {t} = this.props
    return (
      <View>

        <TouchableOpacity
          onPress={() => Actions.listapplicant()}
          style={{ flexDirection: 'row', backgroundColor: Colors.GREEN, padding: 6, marginBottom: 12, }}>

          <View style={{ borderRightColor: Colors.WHITE, borderRightWidth: 2, justifyContent: 'center', alignItems: 'center', padding: 6, flex: 1 }}>
            <Text style={{ color: Colors.GREY1 }}>97 {t("title:applied")}</Text>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 6, flex: 1 }}>
            <Text style={{ color: Colors.GREY1 }}>9 {t("title:accepted")}</Text>
          </View>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.setState({ modalConfirmVisible: true })}
          style={{ backgroundColor: Colors.BLUE, alignItems: 'center', justifyContent: 'center', height: 50, flex: 1, marginTop: 2 }}>
          <Text style={{ color: Colors.WHITE }}>{t("button:confirm_job")}</Text>
        </TouchableOpacity>

      </View>
    )
  }

  mangerInfo() {
    const {t} = this.props
    return (
      <View style={{ flexDirection: 'row', marginTop: 12 }}>

        <TouchableOpacity
          style={{ backgroundColor: Colors.BLUE, alignItems: 'center', justifyContent: 'center', height: 50, flex: 1, marginTop: 2, marginHorizontal: 3, }}>
          <Text style={{ color: Colors.WHITE }}>{t("button:reject")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ backgroundColor: Colors.BLUE, alignItems: 'center', justifyContent: 'center', height: 50, flex: 1, marginTop: 2, marginHorizontal: 3, }}>
          <Text style={{ color: Colors.WHITE }}>{t("button:revise")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ backgroundColor: Colors.BLUE, alignItems: 'center', justifyContent: 'center', height: 50, flex: 1, marginTop: 2, marginHorizontal: 3, }}>
          <Text style={{ color: Colors.WHITE }}>{t("button:approve")}</Text>
        </TouchableOpacity>

      </View>
    )
  }

  currentInfo() {
    const { t }= this.props;
    return (
      <View style={{ flexDirection: 'row', marginTop: 12 }}>

        <TouchableOpacity
          style={{ backgroundColor: Colors.BLUE, alignItems: 'center', justifyContent: 'center', height: 50, flex: 1, marginTop: 2, marginHorizontal: 3, }}>
          <Text style={{ color: Colors.WHITE }}>{t("button:cancel")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.setState({ modalConfirmVisible: true })}
          style={{ backgroundColor: Colors.BLUE, alignItems: 'center', justifyContent: 'center', height: 50, flex: 1, marginTop: 2, marginHorizontal: 3, }}>
          <Text style={{ color: Colors.WHITE }}>{t("button:confirm")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.setState({ modalScheduleVisible: true })}
          style={{ backgroundColor: Colors.BLUE, alignItems: 'center', justifyContent: 'center', height: 50, flex: 1, marginTop: 2, marginHorizontal: 3, }}>
          <Text style={{ color: Colors.WHITE }}>{t("button:reschedule")}</Text>
        </TouchableOpacity>

      </View>
    )
  }

  renderConfirmModal() {
    const {t}= this.props
    return (
      <Modal
        visible={this.state.modalConfirmVisible}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>

            <Text > {t("title:confirm_message")} ?</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 12, }}>

              <TouchableOpacity style={styles.modalBtn} onPress={() => this.setState({ modalConfirmVisible: false })}>
                <Text style={{ color: Colors.WHITE }}>  {t("button:no")}  </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalBtn}>
                <Text style={{ color: Colors.WHITE }}>  {t("button:yes")}  </Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </Modal>
    );
  }

  renderUserModal() {
    const {t}= this.props
    return (
      <Modal
        visible={this.state.modalUserVisible}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modal, {height:width/1.3}]}>

            <Text style={{fontSize:17}}>April Kim </Text>
            <Text style={{fontSize:17}}>{Utis.getHourMinutes(new Date())}</Text>
            <Image source={{uri:this.state.img}} style={{width:150, height:150, borderColor:'#ddd', borderWidth:1, borderRadius:3, marginTop:12}}/>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 12, }}>

              <TouchableOpacity style={styles.modalBtn} onPress={() => this.setState({ modalUserVisible: false })}>
                <Text style={{ color: Colors.WHITE }}> {t("button:cancel")} </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalBtn} onPress={()=> {Actions.searchuser();this.setState({ modalUserVisible: false })}}>
                <Text style={{ color: Colors.WHITE }}> {t("button:ok")} </Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </Modal>
    );
  }

  renderScheduleModal() {
    const {t} = this.props
    return (
      <Modal
        visible={this.state.modalScheduleVisible}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modal, { height: width / 1.3 }]}>

            <Text style={{ fontSize: 18, marginVertical: 6 }}>{t("title:when")}? </Text>

            <Text style={styles.text}>{UtilService.getDateTime(this.state.start) + '-' + UtilService.getHourMinutes(this.state.start)}</Text>
            <Text style={styles.text}>{UtilService.getDateTime(this.state.end) + '-' + UtilService.getHourMinutes(this.state.end)}</Text>

            <Text style={{ fontSize: 18 }}>{t("title:reschedule_to")}? </Text>

            <TouchableOpacity style={{ marginLeft: 12, borderColor: '#ddd', borderWidth: 1, width: width / 2, padding: 5, marginVertical: 6 }} onPress={this._showDateTimePicker1}>
              <Text style={{ fontSize: 15 }}>{t("button:start")}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginLeft: 12, borderColor: '#ddd', borderWidth: 1, width: width / 2, padding: 5, marginVertical: 6 }} onPress={this._showDateTimePicker2}>
              <Text style={{ fontSize: 15 }}>{t("button:end")}</Text>
            </TouchableOpacity>


            <TouchableOpacity style={[styles.modalBtn, { width: 120, marginTop: 8 }]} onPress={() => this.setState({ modalScheduleVisible: false })}>
              <Text style={{ color: Colors.WHITE }}> {t("button:reschedule")} </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    );
  }

  renderScanTimeModal() {
    const {t} = this.props;
    return (
      <Modal
        visible={this.state.modalScanTimeVisible}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modal, { height: width / 1.2 }]}>

            <Text style={{ fontSize: 18, marginVertical: 6 }}>{t("button:scan_time")} </Text>

            <TouchableOpacity 
               style={[styles.modalBtn, { width: 120, marginTop: 8 }]} 
               onPress={() => {
                 this.setState({ modalScanTimeVisible: false });  
                 Actions.qrcode({update:(result)=>{
                  console.log('+ = * = +', result)
                  this.setState({img:result, modalUserVisible: true, scaned:true})
                 }});
                 }}>

              <Text style={{ color: Colors.WHITE }}> {t("button:in")} </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalBtn, { width: 120, marginTop: 8 }]} onPress={() => this.setState({ modalScanTimeVisible: false })}>
              <Text style={{ color: Colors.WHITE }}> {t("button:out")} </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    );
  }

  scanTime() {
    const { t } = this.props
    return (
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <View style={{ flexDirection: 'row', backgroundColor: Colors.GREEN, padding: 6, marginBottom: 12, alignItems:'center', justifyContent:'center', width:'100%' }}>
          <Text style={{ fontSize: 17, color: Colors.BLUE }}> 9 {t("button:confirmed")}</Text>
        </View>

        {
          !this.state.scaned &&
          <TouchableOpacity style={[styles.modalBtn, { width: 120, marginTop: 8 }]} onPress={() => this.setState({ modalScanTimeVisible: true })}>
            <Text style={{ color: Colors.WHITE }}> {t("button:scan_time")} </Text>
          </TouchableOpacity>
        }

      </View>
    )
  }


  render() {

    const { manager, current, status, t } = this.props;

    return (
      <KeyboardAvoidingView style={i.container} behavior={"padding"} >

        <Header title={manager ? 'Pending for My Approval' : 'Job Ads Details'} />

        <ScrollView style={{ margin: 12, }} >

          <Text style={[styles.statusText, {color:UtilService.getColor(status)}]}>{UtilService.getStatus(status)}</Text>

          <TouchableOpacity style={styles.row}>
            <Image source={pic.img_info} style={{ width: 36, height: 36 }} />

            <View style={{ marginLeft: 12, paddingBottom: 12, }}>
              <Text style={{ fontSize: 16 }}>{t("title:what")}</Text>
              <Text style={styles.text}>Banquet</Text>
              <Text style={styles.text}>PART-TIME SERVICE/KITCHEN CREW</Text>
              <Text style={styles.text}>Great Eastern Annual Dinner</Text>
              <Text style={styles.text}>To assist & support during banquet event</Text>
            </View>

          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <Image source={pic.img_schedule} style={{ width: 36, height: 36 }} />

            <View style={{ marginLeft: 12, paddingBottom: 12, }}>
              <Text style={{ fontSize: 16 }}>{t("title:when")} ?</Text>
              <Text style={styles.text}>14-Apr-2019 18:00 PM</Text>
              <Text style={styles.text}>15-Apr-2019 18:00 PM</Text>
              <Text style={styles.text}>7 hrs</Text>
            </View>

          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <Image source={pic.img_dollar} style={{ width: 36, height: 36 }} />

            <View style={{ marginLeft: 12, paddingBottom: 12, }}>
              <Text style={{ fontSize: 16 }}>{t("title:pay")} ?</Text>
              <Text style={styles.text}>{t("title:rate")}: MYR 15 {t("title:per_hour")}</Text>
              <Text style={styles.text}>Est. {t("title:cost")}: MYR 2100</Text>
            </View>

          </TouchableOpacity>

          <TouchableOpacity style={[styles.row, { marginBottom: 0, }]}>
            <Image source={pic.img_people} style={{ width: 36, height: 36 }} />

            <View style={{ marginLeft: 12, paddingBottom: 12, }}>
              <Text style={{ fontSize: 16 }}>{t("title:who")} ?</Text>
              <Text style={styles.text}>{t("title:on_duty")}: 4 {t("title:person")}</Text>
              <Text style={styles.text}>{t("title:request")}: 20 {t("title:person")}</Text>
            </View>

          </TouchableOpacity>

          {status !== 1 && !manager && !current && this.userInfo()}
          {status !== 1 && !manager && current && this.currentInfo()}

          {status !== 1 && manager && this.mangerInfo()}

          {status == 1 && this.scanTime()}

          {this.renderConfirmModal()}
          {this.renderScheduleModal()}
          {this.renderScanTimeModal()}
          {this.renderUserModal()}


          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible1}
            onConfirm={this._handleDatePicked1}
            onCancel={this._hideDateTimePicker1}
          />

          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible2}
            onConfirm={this._handleDatePicked2}
            onCancel={this._hideDateTimePicker2}
          />

        </ScrollView>

      </KeyboardAvoidingView>
    );
  }
}

export default withNamespaces(["common"], { wait: true })( JobDetails );


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
    width: 70,
    borderRadius: 5,
    alignItems: 'center',
  },


});
