import * as firebase from 'firebase'

const settings = { timestampsInSnapshots: true }

var firebaseConfig = {
  apiKey: "AIzaSyAiCvFcXVxl1Q9WHP4fu-s8sIpwwrHWXt0",
  authDomain: "androidbaberbooking-ffa36.firebaseapp.com",
  databaseURL: "https://androidbaberbooking-ffa36.firebaseio.com",
  projectId: "androidbaberbooking-ffa36",
  storageBucket: "androidbaberbooking-ffa36.appspot.com",
  messagingSenderId: "368936758316",
  appId: "1:368936758316:web:fd60b1754b6cf8ae90b589"
};
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings(settings)

export default firebase;
  // Initialize Firebasenp