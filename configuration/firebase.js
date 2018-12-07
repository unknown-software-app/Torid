import * as firebase from 'firebase';


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBM-D7ryuAjhEn9MXx7sVE4Feo5tyyafA4",
  authDomain: "torid-57277.firebaseapp.com",
  databaseURL: "https://torid-57277.firebaseio.com",
  projectId: "torid-57277",
  storageBucket: "torid-57277.appspot.com",
  messagingSenderId: "387618019305"
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
