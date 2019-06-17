import * as firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCld1VMyjgIkq0x6qcgZh06qsJ1GfQYJ7o",
    authDomain: "messaging-app-7b5ec.firebaseapp.com",
    databaseURL: "https://messaging-app-7b5ec.firebaseio.com",
    projectId: "messaging-app-7b5ec",
    storageBucket: "messaging-app-7b5ec.appspot.com",
    messagingSenderId: "908462340843",
    appId: "1:908462340843:web:ff81af2eff4f3705"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export{
      db, firebase as default
  }