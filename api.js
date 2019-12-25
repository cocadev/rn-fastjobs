import Cache from "./utils/cache";
import * as config from "./config";
import UtilService from "./utils/utils";

module.exports = {
  async fetchData(url, request, cb) {
    try {
      let response = await fetch(url, request);
      let responseJson = await response.json()
      if (response.status == 200) {
        cb(null, responseJson);
      } else {
        cb(responseJson);
      }
    } catch (error) {
      console.log('----', url)
      cb(error);
    }
  },
  async middleware(url, request, cb) {  
      this.fetchData(url, request, cb)
  },
  baseApi(sub_url, method, json_data, cb) {
   
    let request = {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: Cache.currentUser
          ? "bearer " + Cache.token
          : null,
      }
    };
    if (method == "POST" || method == "PUT") {
      request["body"] = JSON.stringify(json_data);
    } else{
      // sub_url += '&t='+(new Date()).getTime()
    }

    this.middleware(config.SERVICE_API_URL + sub_url, request, cb);
  },

  async init(cb) {
    //check if current user exists or not
    let user = await UtilService.getLocalStringData("currentUser");
    Cache.clientID = await UtilService.getLocalStringData("client");
    if (user == null) {
      cb("err");
    } else {
      Cache.currentUser = JSON.parse(user);

      let locationHeader = await UtilService.getLocalStringData('locationHeader')
      let locations = await UtilService.getLocalStringData('locations')

      Cache.locationHeader = JSON.parse(locationHeader)
      Cache.locations = JSON.parse(locations)
      cb(null);
    }
  },

  // login(ClientID, PhoneNumber, Password, cb) {
  //   Cache.PhoneNumber = PhoneNumber;
  //   Cache.Password = Password;
  //   Cache.clientID = ClientID;
  //   this.baseApi("/api/appLogin", "POST", { PhoneNumber, Password }, cb);
  // },

  logout() {
    UtilService.removeLocalObjectData("currentUser");
  },

  async uploadImage(file, cb) {
    // console.log('uploadImage',file)
    if ( !Cache.hasInternetConnection ){
      cb(null, '')
      return;
    }
    try {
      // let image = {
      //   uri: file,
      //   type: "image/jpeg",
      //   name: "file.jpeg"
      // };

      let formData = new FormData();
      formData.append("file", file);
      console.log(file)
      // console.log('uploadImage',file)
      let response = await fetch(
        config.SERVICE_API_URL + "/api/common/files/upload",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: "bearer " + Cache.currentUser["token"],
            client: Cache.clientID
          },
          body: formData
        }
      );
      let status = response.status;

      let responseJson = await response.json();
      if (status == 200 || status == 201) {
        cb(null, responseJson);
      } else {
        cb(responseJson.message);
      }
    } catch (error) {
      cb(error);
    }
  },

  async baseUploadApi(sub_url, file){
    // console.log('baseUploadApi', file)
    if ( !Cache.hasInternetConnection ){
      return null;
    }
      let image = {
        uri: file,
        type: "image/jpeg",
        name: "file.jpeg"
      };
      try{
      let formData = new FormData();
      formData.append("file", image);
      let response = await fetch(
        config.SERVICE_API_URL + sub_url,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            "client":"c001"
          },
          body: formData
        }
      );
      let status = response.status;
      let responseJson = await response.json();
      // console.log('status',status, 'responseJson', responseJson)
      return {
        status,
        data:JSON.parse(responseJson.Result)
      }
      }catch(error){
        // console.log(error)
        return error
      }
  },

  async uploadAllData(cb){
    if ( Cache.locationHeader ){
      this.uploadLocations(async(err, res)=>{
        if ( err == null) {
          Cache.locationHeader = null
          Cache.locations = []
          await UtilService.removeLocalObjectData('locationHeader')
          await UtilService.removeLocalObjectData('locations')
        }
      })
    }
    if ( Cache.requestStack.length > 0 ){
      async.mapSeries(Cache.requestStack, async ({url, request}, cb)=>{
        try {
          let response = await fetch(url, request);
          let responseJson = await response.json();
          if (response.status == 200) {
            cb(null, responseJson);
          } else {
            cb(responseJson);
          }
        } catch (error) {
          cb(error);
        }
      }, async (error, results)=>{
        Cache.requestStack.splice(0, results.length)
        await UtilService.removeLocalObjectData('requests')
        if ( error != null ){
          await UtilService.saveLocalStringData('requests', JSON.stringify(Cache.requestStack))
        }
        cb(err, results)
      })
    }
  },









  /////////////////////////
  /////////////////////////
  /////////////////////////
  /////////////////////////
  addJob(job_name, job_details, job_task, job_type, job_start, job_end, estimated_cost, rate,  cb){
    this.baseApi('addjob', 'POST', { job_name, job_details, job_task, job_ads_type:job_type, start_time: job_start, end_time: job_end, request_vacancy: estimated_cost, rate }, cb)
  },

  //////////////////////////////
  //////////////////////////////
  signinEmployer( email, password, cb){
    this.baseApi('employers/login', 'POST', { email, password }, cb)
  },
  signinJobSeeker( email, password, cb){
    this.baseApi('jobseekers/login', 'POST', { email, password }, cb)
  },
  registerEmployer( email, password, cb){
    this.baseApi('employers/register/', 'POST', { email, password }, cb)
  },
  registerJobSeeker( email, password, cb){
    this.baseApi('jobseekers/register/', 'POST', { email, password }, cb)
  },








  //////////////////////////////
  getAllCategories(cb){
    this.baseApi('Category/GetAllCategories', 'GET', {}, cb)
  },

  getAllItems(type, count, cb){
    this.baseApi('Appointment/GetAll'+ type +'?PageIndex=0&PageSize=' + count, 'GET', {}, cb)
  },


  getAllJobs(cb){
    this.baseApi('jobs/', 'GET', {}, cb)
  },
  getProfile(id, cb){
    this.baseApi('jobseekers/' + id, 'GET', {}, cb)
  },
  
  //JOB
  changeJobType(id, job_type, expected_salary, salery_type,  cb){
    this.baseApi('jobseekers/' + id + '/job', 'PUT', { job_type, expected_salary, salery_type }, cb)
  },
  aboutMe(id, birthday, employment_status, gender, highest_education, mobile, name, passport, photoURL, cb){
    console.log('hi ----------------------')
    this.baseApi('jobseekers/' + id + '/me', 'PUT', { birthday, employment_status, gender, highest_education, mobile, name, passport, photoURL }, cb)
  },

  //Experience
  addExperience( id, name, title, start, end, status, cb){
    this.baseApi('jobseekers/' + id + '/experience', 'POST', { name, title, start, end, status }, cb)
  },
  updateExperience( id, key, name, title, start, end, status, cb){
    this.baseApi('jobseekers/' + id + '/' + key + '/experience', 'PUT', { name, title, start, end, status }, cb)
  },
  addExperience( id, name, title, start, end, status, cb){
    this.baseApi('jobseekers/' + id + '/experience', 'POST', { name, title, start, end, status }, cb)
  },
  removeExperience( id, key, cb){
    this.baseApi('jobseekers/' + id + '/' + key + '/experience', 'DELETE', {}, cb)
  },
  
}