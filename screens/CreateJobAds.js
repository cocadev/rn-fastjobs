import React from 'react';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal, Image, Dimensions, TextInput, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { i } from '../constants/Style';
import { pic } from '../constants/Image';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { withNamespaces } from "react-i18next";
import UtilService from '../utils/utils';
import api from '../api'
import { Actions } from 'react-native-router-flux';

const width = Dimensions.get('window').width;

class CreateJobAds extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      check: false,

      modalVisible1: false,
      job_name: '',
      job_details: '',
      job_task: '',
      job_type: '',

      hourly_rate: '1',

      isDateTimePickerVisible1: false,
      isDateTimePickerVisible2: false,

      hourModal: false,

      startDate: new Date(),
      endDate: new Date()


    };
  }

  _showDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: true });
  _showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: true });

  _hideDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: false });
  _hideDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: false });

  _handleDatePicked1 = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({ startDate: date });
    this._hideDateTimePicker1();
  };

  _handleDatePicked2 = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({ endDate: date });
    this._hideDateTimePicker2();
  };

  onWhat = () => {
    this.setState({
      modalVisible1: false,
      job_name: this.state.job_name,
      job_task: this.state.job_task,
      job_details: this.state.job_details,
      job_type: this.state.job_type
    })
  }

  renderIndicator1() {
    const { t } = this.props;
    const { job_details, job_name, job_task, job_type } = this.state
    return (
      <Modal
        visible={this.state.modalVisible1}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>

            <Text >{t("title:what")} ?</Text>

            <TextInput
              style={styles.input}
              placeholder={t("placeholder:job_type")}
              onChangeText={(job_type) => this.setState({ job_type })}
              value={job_type}
            />

            <TextInput
              style={styles.input}
              placeholder={t("placeholder:job_name")}
              onChangeText={(job_name) => this.setState({ job_name })}
              value={job_name}
            />

            <TextInput
              style={styles.input}
              placeholder={t("placeholder:task")}
              onChangeText={(job_task) => this.setState({ job_task })}
              value={job_task}
            />

            <TextInput
              style={[styles.input, { height: 200}]}
              multiline={true}
              placeholder={t("placeholder:details")}
              onChangeText={(job_details) => this.setState({ job_details })}
              value={job_details}
            />
        
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 12, }}>

              <TouchableOpacity style={styles.modalBtn} onPress={() => this.setState({ modalVisible1: false, task: '', details: '', type: '', name: '' })}>
                <Text style={{ color: Colors.WHITE }}> {t("button:cancel")} </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBtn}
                onPress={this.onWhat}>
                <Text style={{ color: Colors.WHITE }}>  {t("button:ok")}  </Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </Modal>
    );
  }

  renderHourModal() {
    const { t } = this.props
    const { hourly_rate } = this.state
    return (
      <Modal
        visible={this.state.hourModal}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <TextInput
              style={styles.input}
              keyboardType={'numeric'}
              // placeholder={t("placeholder:hourly_rate")}
              onChangeText={(hourly_rate) => this.setState({ hourly_rate })}
              value={hourly_rate}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 12, }}>

              <TouchableOpacity style={styles.modalBtn} onPress={() => this.setState({ hourModal: false, hourly_rate: 1, })}>
                <Text style={{ color: Colors.WHITE }}> {t("button:cancel")} </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => this.setState({ hourModal: false})}
              >
                <Text style={{ color: Colors.WHITE }}>  {t("button:ok")}  </Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>
    )
  }

  sendToApprove = () => {
    const { job_type, job_details, job_name, job_task, startDate, endDate, hourly_rate, } = this.state;
    const estimated_cost = hourly_rate * UtilService.getTimePeriod(startDate, endDate)
    api.addJob(job_name, job_details, job_task, job_type, startDate, endDate, estimated_cost, hourly_rate, (err,res)=>{
      if (err == null ){
        console.log('res', res)
        this.setState({isWaiting:false})
        ToastAndroid.show("Success", ToastAndroid.SHORT);
        Actions.pop('')
      } else{
        console.log('err', err)
        ToastAndroid.show("Fail", ToastAndroid.SHORT);

      }
      this.setState({isWaiting:false})
    })
  }

  render() {

    const { job_type, job_details, job_name, job_task, startDate, endDate } = this.state;
    const { t } = this.props;

    return (
      <KeyboardAvoidingView style={i.container} behavior={"padding"} >

        <Header title={t("header:create_job_ads")} />

        <ScrollView style={{ margin: 12, }} >

          <TouchableOpacity style={styles.row} onPress={() => this.setState({ modalVisible1: true })}>
            <Image source={pic.img_info} style={{ width: 36, height: 36 }} />

            <View style={{ marginLeft: 12, paddingBottom: 12, }}>
              <Text style={{ fontSize: 16 }}>{t("title:what")}</Text>
              <Text style={styles.text}>{job_type}</Text>
              <Text style={styles.text}>{job_name}</Text>
              <Text style={styles.text}>{job_details}</Text>
              <Text style={styles.text}>{job_task}</Text>
            </View>

          </TouchableOpacity>

          <View style={styles.row}>
            <Image source={pic.img_schedule} style={{ width: 36, height: 36 }} />

            <View style={{ marginLeft: 12, paddingBottom: 12, }}>
              <Text style={{ fontSize: 16 }}>{t("title:when")} ?</Text>
              <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity style={{ marginRight: 10, }} onPress={this._showDateTimePicker1}>
                  <Text>{t("title:select_startDate")}</Text>
                </TouchableOpacity>
                <Text style={styles.text}>{UtilService.getDateTime(startDate) + '-' + UtilService.getHourMinutes(startDate)}</Text>

              </View>
              <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity style={{ marginRight: 16, }} onPress={this._showDateTimePicker2}>
                  <Text>{t("title:select_endDate")}</Text>
                </TouchableOpacity>
                <Text style={styles.text}>{UtilService.getDateTime(endDate) + '-' + UtilService.getHourMinutes(endDate)}</Text>

              </View>
              <Text style={styles.text}>{UtilService.getTimePeriod(startDate, endDate)} hrs</Text>

              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible1}
                onConfirm={this._handleDatePicked1}
                onCancel={this._hideDateTimePicker1}
                mode={'datetime'}
              />

              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible2}
                onConfirm={this._handleDatePicked2}
                onCancel={this._hideDateTimePicker2}
                mode={'datetime'}
              />

            </View>

          </View>

          <TouchableOpacity onPress={() => this.setState({ hourModal: true })} style={styles.row}>
            <Image source={pic.img_dollar} style={{ width: 36, height: 36 }} />

            <View style={{ marginLeft: 12, paddingBottom: 12, }}>
              <Text style={{ fontSize: 16 }}>{t("title:pay")} ?</Text>
              <Text style={styles.text}>{t("title:rate")}: MYR {this.state.hourly_rate} {t("title:per_hour")}</Text>
              <Text style={styles.text}>Est. {t("title:cost")}: MYR {this.state.hourly_rate * UtilService.getTimePeriod(startDate, endDate)}</Text>
            </View>

          </TouchableOpacity>

          {/* <TouchableOpacity style={[styles.row, { marginBottom: 0, }]}>
            <Image source={pic.img_people} style={{ width: 36, height: 36 }} />

            <View style={{ marginLeft: 12, paddingBottom: 12, }}>
              <Text style={{ fontSize: 16 }}>{t("title:who")} ?</Text>
              <Text style={styles.text}>{t("title:on_duty")}: 4 {t("title:person")}</Text>
              <Text style={styles.text}>{t("title:request")}: 20 {t("title:person")}</Text>
            </View>

          </TouchableOpacity> */}

          <View style={{ flexDirection: 'row', }}>

            {/* <TouchableOpacity
              style={{ backgroundColor: Colors.BLUE, alignItems: 'center', justifyContent: 'center', height: 50, flex: 1, marginTop: 12, marginHorizontal: 6, }}>
              <Text style={{ color: Colors.WHITE }}>{t("button:save_as_draft")}</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={this.sendToApprove}
              style={{ backgroundColor: Colors.BLUE, alignItems: 'center', justifyContent: 'center', height: 50, flex: 1, marginTop: 12, marginHorizontal: 6, }}>
              <Text style={{ color: Colors.WHITE }}>{t("button:send_to_approval")}</Text>
            </TouchableOpacity>

          </View>

          <View style={{ flexDirection: 'row', }}>
           
            {/* <TouchableOpacity
              style={{ backgroundColor: Colors.BLUE, alignItems: 'center', justifyContent: 'center', height: 50, flex: 1, marginTop: 12, marginHorizontal: 6, }}>
              <Text style={{ color: Colors.WHITE }}>{t("button:delete")}</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
              style={{ backgroundColor: Colors.BLUE, alignItems: 'center', justifyContent: 'center', height: 50, flex: 1, marginTop: 12, marginHorizontal: 6, }}>
              <Text style={{ color: Colors.WHITE }}>{t("button:cancel_job")}</Text>
            </TouchableOpacity> */}
            
          </View>



          {this.renderIndicator1()}
          {this.renderHourModal()}


        </ScrollView>

      </KeyboardAvoidingView>
    );
  }
}

export default withNamespaces(["common"], { wait: true })(CreateJobAds);

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
    borderRadius: 5,
    shadowColor: "black",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 16,
    paddingLeft: 12,
    marginVertical: 3,
    borderRadius: 5,
    margin: 20,
    marginTop: 10,
    width: '90%'
  },
});
