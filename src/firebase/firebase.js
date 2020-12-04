import firebase from "firebase/app";
import 'firebase/auth';
var firebaseConfig = {
    apiKey: "AIzaSyDej-uUreaJvyVhk0sNhA5RY7xeiAWFovk",
    authDomain: "dt-inventory.firebaseapp.com",
    projectId: "dt-inventory",
    storageBucket: "dt-inventory.appspot.com",
    messagingSenderId: "670050939096",
    appId: "1:670050939096:web:0aebe0b6c64addbd60a7ad",
    measurementId: "G-KDH2MY52XK"
  };
  // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   const auth = firebase.auth();
   export {auth as default};

  