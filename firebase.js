import * as firebase from 'firebase';
import { FIREBASE } from './config';

var config = {
  apiKey: FIREBASE.apiKey,
  authDomain: FIREBASE.authDomain,
  databaseURL: FIREBASE.databaseURL,
  projectId: FIREBASE.projectId,
  storageBucket: FIREBASE.storageBucket,
  messagingSenderId: FIREBASE.messagingSenderId
};

export default firebase.initializeApp(config);