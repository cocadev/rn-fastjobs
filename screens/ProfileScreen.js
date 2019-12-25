import React from 'react';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';
import UtilService from '../utils/utils';
import StarRating from 'react-native-star-rating';
import Cache from '../utils/cache'
import QRCode from 'react-native-qrcode-svg';
import { ScrollView, Text, View, Picker, Image, StyleSheet, TextInput, Dimensions, Modal, TouchableOpacity, FlatList } from 'react-native';
import { i } from '../constants/Style';
import { withNamespaces } from "react-i18next";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../src/store/common/actions";
import api from '../api'

const width = Dimensions.get('window').width

class ProfileScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      language: this.props.i18n.language,
      jobModal: false,
      salaryModal: false,
      checked_salery: 1,
      starCount: 3.5,
      skills: [
        { name: 'Telephon Support', ranking: 3.5 },
        { name: 'MS Offline', ranking: 1.5 },
      ],
      educations: [
        { name: 'Degree in Marketing', title: 'APIIT', start: "1999", end: "2005" },
        { name: 'Degree in Law', title: 'King', start: "2004", end: "2009" },
      ],
      currentUser: null,
      job_type: '',
      expected_salery: '0',
      salery_type: '',

    };
    this.getProfile = this.getProfile.bind(this)
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile() {
    console.log('hiiiiiiiiii')
    this.setState({ isWaiting: true })
    let that = this
    api.getProfile(this.props.userId, (err, res) => {
      if (err == null) {

        Object.keys(res.results).map(function (_) {
          that.setState({ 
            currentUser: res.results[_], 
            expected_salery: res.results[_].job.expected_salary,
            salery_type: res.results[_].job.salery_type
          })
        })

        this.setState({ isWaiting: false })
      } else {
        console.log('err &&&&&&&&', err)
        this.setState({ isWaiting: false })
      }
    })
  }

  changeJobType =()=>{

    let that = this;
    this.setState({ jobModal: false, salaryModal: false, isWaiting: true})
    const { job_type, expected_salery, salery_type } = this.state;

    api.changeJobType(this.props.userId, job_type, expected_salery, salery_type, (err, res) => {
      if (err == null) {
        this.getProfile()
        this.setState({ isWaiting: false })
      } else {
        console.log('err &&&&&&&&', err)
        this.setState({ isWaiting: false })
      }
    })
  }

  showMe(itemValue) {
    this.setState({ language: itemValue });

    switch (itemValue) {
      case "en":
        this.props.i18n.changeLanguage("en");
        break;
      case "cn":
        this.props.i18n.changeLanguage("cn");
        break;
      case "th":
        this.props.i18n.changeLanguage("th");
        break;
      case "bm":
        this.props.i18n.changeLanguage("bm");
        break;
      case "id":
        this.props.i18n.changeLanguage("id");
        break;
      default:
        this.props.i18n.changeLanguage("en");
        break;
    }
  }

  jobModal() {
    const { t } = this.props
    const { job_type } = this.state
    return (
      <Modal
        visible={this.state.jobModal}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: Colors.DARKBLUE, margin: 10, textAlign: 'center', marginVertical: 20 }}>What job types you prefer?</Text>
            </View>

            <CircleCheckBox
              checked={job_type === 'Part Time' ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ job_type: 'Part Time' })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Part Time"
              styleLabel={{ width: width / 2, marginVertical: 3, color: job_type === 'Part Time' ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={job_type === 'Full Time' ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ job_type: 'Full Time' })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Full Time"
              styleLabel={{ width: width / 2, marginVertical: 3, color: job_type === 'Full Time' ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={job_type === 'Contact' ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ job_type: 'Contact' })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Contact"
              styleLabel={{ width: width / 2, marginVertical: 3, color: job_type === 'Contact' ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <View style={{ flexDirection: 'row', marginBottom: 12, marginTop: 6 }}>
              <TouchableOpacity style={styles.modalBtn} onPress={() => this.setState({ jobModal: false })}>
                <Text style={{ color: Colors.WHITE }}> {t("button:cancel")} </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalBtn} onPress={this.changeJobType} >
                <Text style={{ color: Colors.WHITE }}> {t("button:ok")} </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    );
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  salaryModal() {
    const { salery_type } = this.state
    const { t } = this.props;

    return (
      <Modal
        visible={this.state.salaryModal}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modal, { height: width / 1.6 }]}>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: Colors.DARKBLUE, margin: 10, textAlign: 'center', marginVertical: 20 }}>Salery Period</Text>
            </View>

            <CircleCheckBox
              checked={salery_type === "per hour" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ salery_type: "per hour" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="per hour"
              styleLabel={{ width: width / 2, marginVertical: 3, color: salery_type === "per hour" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={salery_type === "per day" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ salery_type: "per day" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="per day"
              styleLabel={{ width: width / 2, marginVertical: 3, color: salery_type === "per day" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={salery_type === "per week" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ salery_type: "per week" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="per week"
              styleLabel={{ width: width / 2, marginVertical: 3, color: salery_type === "per week" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={salery_type === "per month" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ salery_type: "per month" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="per month"
              styleLabel={{ width: width / 2, marginVertical: 3, color: salery_type === "per month" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <CircleCheckBox
              checked={salery_type === "per shift" ? true : false}
              outerColor={Colors.PINK}
              innerColor={Colors.PINK}
              outerSize={20}
              innerSize={13}
              filterSize={17}
              onToggle={() => this.setState({ salery_type: "per shift" })}
              labelPosition={LABEL_POSITION.RIGHT}
              label="per shift"
              styleLabel={{ width: width / 2, marginVertical: 3, color: salery_type === "per shift" ? Colors.PINK : Colors.DARK, marginLeft: 20, }}
            />

            <View style={{ flexDirection: 'row', marginBottom: 12, marginTop: 6 }}>
              <TouchableOpacity style={styles.modalBtn} onPress={() => this.setState({ salaryModal: false })}>
                <Text style={{ color: Colors.WHITE }}> {t("button:cancel")} </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalBtn} onPress={this.changeJobType}>
                <Text style={{ color: Colors.WHITE }}> {t("button:ok")} </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    )
  }

  _renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', paddingHorizontal: 12, }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <MaterialCommunityIcons name="checkbox-blank-circle" size={17} color={Colors.PINK} />
        <View style={{ width: 1, flex: 1, backgroundColor: Colors.GREY }} />
      </View>
      <View style={{ marginLeft: 12, marginVertical: 5 }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>{item.title}</Text>
        <Text>{item.start + ' - ' + item.end}</Text>

      </View>
    </View>
  )

  _renderSkillItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, alignItems: 'center' }}>
      <Text style={styles.title}>{item.name}</Text>
      <StarRating
        disabled={true}
        emptyStar={'ios-star-outline'}
        fullStar={'ios-star'}
        halfStar={'ios-star-half'}
        iconSet={'Ionicons'}
        maxStars={5}
        starStyle={{ paddingHorizontal: 1, marginHorizontal: 1, }}
        starSize={25}
        rating={item.ranking}
        fullStarColor={'#fcb040'}
      />
    </View>
  )

  _renderEducationItem = ({ item }) => (
    <View style={{ paddingHorizontal: 12, }}>

      <View style={{ marginLeft: 12, marginVertical: 5 }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>{item.title}</Text>
        <Text>{item.start + ' - ' + item.end}</Text>

      </View>
    </View>
  )

  _aboutMe =(i)=>{
    this.setState({isWaiting: true})
    console.log('********* *************birthday ************', i.birthday)
    console.log('********* *************employment_status ************', i.employment_status)
    console.log('********* *************gender ************', i.gender)
    console.log('********* *************highest_education ************', i.highest_education)
    console.log('********* *************mobile ************', i.mobile)
    console.log('********* *************name ************', i.name)
    console.log('********* *************passport ************', i.passport)
    console.log('********* *************photoURL ************', i.photoURL)

    api.aboutMe(this.props.userId, i.birthday, i.employment_status, i.gender?"Male": "FeMale", i.highest_education, i.mobile, i.name, i.passport, i.photoURL, (err, res) => {
      if (err == null) {
        this.getProfile()
        this.setState({ isWaiting: false })
      } else {
        console.log('err &&&&&&&&', err)
        this.setState({ isWaiting: false })
      }
    })
  }

  render() {
    const { t } = this.props;
    const { me, isWaiting, currentUser, expected_salery, job_type, salery_type } = this.state;

    if (this.state.isWaiting || !currentUser) {
      return (
        <View style={styles.container}>
          <Text style={styles.bold}>Loading ...</Text>
        </View>
      )
    }

    return (
      <View style={i.container}>
        <Header title={t("header:myprofile")} />

        <ScrollView>
          <View style={{ flexDirection: 'row', padding: 4, alignItems: 'center' }}>
            <Image source={{ uri: currentUser.me.photoURL }} style={{ width: 60, height: 60 }} />
            <View style={{ marginLeft: 12 }}>
              <Text style={{ fontWeight: '600', fontSize: 16, }}>{ currentUser.me.name}</Text>
              <Text>{currentUser.email}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>{currentUser.me.mobile}</Text>
                {currentUser.mobile &&
                  <View style={{ backgroundColor: '#2fb580', borderRadius: 20, paddingHorizontal: 12, marginLeft: 12 }}>
                    <Text style={{ color: '#fff' }}>{t('other:verified')}</Text>
                  </View>
                }
              </View>

            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 12, }}>
              <QRCode
                style={{ textAlign: 'right' }}
                size={20}
                logoSize={5}
                value={ currentUser.me.email}
                logo={{ uri: currentUser.me.photoURL }}
              />
            </View>
          </View>

          <View style={{ backgroundColor: '#ddd', height: 2, width: '100%' }}></View>

          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}>

            <View style={{ flex: 1 }}>
              <Text style={[styles.title, { fontSize: 16 }]}>Job Type</Text>
              <Text>{currentUser.job.job_type}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => this.setState({ jobModal: true })} style={styles.pinkview}>
                <Text>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[styles.title, { fontSize: 16, paddingHorizontal: 12 }]}>Expected Salary</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ fontSize: 20 }}>RM</Text>
              <TextInput
                style={{ height: 30, borderBottomColor: 'gray', borderBottomWidth: 1, flex: 1 }}
                keyboardType={'numeric'}
                onChangeText={(expected_salery) => this.setState({ expected_salery })}
                value={expected_salery}
              />
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => this.setState({ salaryModal: true })} style={[styles.pinkview, { borderColor: Colors.GREY2 }]}>
                <Text>{currentUser.job.salery_type}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ backgroundColor: '#ddd', height: 2, width: '100%' }}></View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 12, alignItems: 'center' }}>
            <Text style={[styles.title, { fontSize: 22 }]}>About Me</Text>
            <TouchableOpacity onPress={() => Actions.profileaboutme({ update: () => { this.getProfile() },currentUser })}>
              <FontAwesome name="edit" size={32} color={'#2f6e88'} />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', paddingHorizontal: 12, marginTop: 5 }}>
            <View style={{ flex: 1, height: 40 }}>
              <Text style={styles.title}>Gender</Text>
              <Text>{currentUser.me.gender}</Text>
            </View>
            <View style={{ flex: 1, height: 40 }}>
              <Text style={styles.title}>Birthday</Text>
              <Text>{UtilService.getDateTime(currentUser.me.birthday)}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', paddingHorizontal: 12, marginTop: 5 }}>
            <View style={{ flex: 1, height: 40 }}>
              <Text style={styles.title}>Employment Status</Text>
              <Text>{currentUser.me.employment_status}</Text>
            </View>
            <View style={{ flex: 1, height: 40 }}>
              <Text style={styles.title}>IC/Passport No</Text>
              <Text>{currentUser.me.passport}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', paddingHorizontal: 12, marginVertical: 5 }}>
            <View style={{ flex: 1, height: 40 }}>
              <Text style={styles.title}>Highest Education</Text>
              <Text>{currentUser.me.highest_education}</Text>
            </View>
            <View style={{ flex: 1 }}>

            </View>
          </View>

          <View style={{ backgroundColor: '#ddd', height: 2, width: '100%' }}></View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 12, alignItems: 'center' }}>
            <Text style={[styles.title, { fontSize: 22 }]}>My Contact</Text>
            <TouchableOpacity onPress={() => Actions.profilecontact({ title: 'My Contact', data: currentUser.contact })}>
              <FontAwesome name="edit" size={32} color={'#2f6e88'} />
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="map-marker" size={17} color={Colors.GREY} />
              <Text>{currentUser.contact.address}</Text>
            </View>
            <Text>{currentUser.contact.city?currentUser.contact.city:'' + ' ' + currentUser.contact.country}</Text>
          </View>

          <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
            <Text style={styles.title}>Emergency Contact</Text>
            <Text>{currentUser.contact.emergency_contact?currentUser.contact.emergency_contact:'' + ' '} { currentUser.contact.emergency_contact_no?currentUser.contact.emergency_contact_no:''}</Text>
          </View>

          <View style={{ backgroundColor: '#ddd', height: 2, width: '100%' }}></View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 12, alignItems: 'center' }}>
            <Text style={[styles.title, { fontSize: 22 }]}>Work Experience</Text>
            <TouchableOpacity onPress={() => Actions.profileExperience({ update: () => { this.getProfile() }, data: currentUser.work_experience })}>
              <FontAwesome name="edit" size={32} color={'#2f6e88'} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={UtilService.filterExperience(currentUser.work_experience) }
            keyExtractor={(item, i) => String(i)}
            renderItem={this._renderItem}
          />

          <View style={{ backgroundColor: '#ddd', height: 2, width: '100%' }}></View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 12, alignItems: 'center' }}>
            <Text style={[styles.title, { fontSize: 22 }]}>Education</Text>
            <TouchableOpacity onPress={() => Actions.profileEducations({ data: this.state.educations })}>
              <FontAwesome name="edit" size={32} color={'#2f6e88'} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={this.state.educations}
            keyExtractor={(item, i) => String(i)}
            renderItem={this._renderEducationItem}
          />

          <View style={{ backgroundColor: '#ddd', height: 2, width: '100%' }}></View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 12, alignItems: 'center' }}>
            <Text style={[styles.title, { fontSize: 22 }]}>Skills</Text>
            <TouchableOpacity onPress={() => Actions.profileSkills({ data: this.state.skills })}>
              <FontAwesome name="edit" size={32} color={'#2f6e88'} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={this.state.skills}
            keyExtractor={(item, i) => String(i)}
            renderItem={this._renderSkillItem}
          />

          <Picker
            selectedValue={this.state.language}
            style={{
              height: 50,
              width: 300,
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center"
            }}
            onValueChange={(itemValue, itemIndex) => this.showMe(itemValue)}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="简体中文" value="cn" />
            <Picker.Item label="ไทย" value="th" />
            <Picker.Item label="Bahasa Malaysia" value="bm" />
            <Picker.Item label="Bahasa Indonesia" value="id" />

          </Picker>

          {this.jobModal()}
          {this.salaryModal()}

          <View style={{ marginTop: 28 }}></View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: Colors.DARKBLUE,
    fontSize: 16,
    fontWeight: '600'
  },
  pinkview: {
    borderRadius: 4,
    borderColor: Colors.PINK,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    width: 110,
    height: 35
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
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    alignItems: "center",
    justifyContent: "center"
  },
  modalBtn: {
    padding: 5,
    marginHorizontal: 6,
    backgroundColor: Colors.BLUE,
    width: 70,
    borderRadius: 5,
    alignItems: 'center',
  }
})

export default connect(
  state => ({
    userId: state.common.userId,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(withNamespaces(["other", "common"], { wait: true })(
  ProfileScreen
));
