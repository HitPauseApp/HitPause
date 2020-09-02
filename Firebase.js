import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyD9cYKlneTe_F1RoEBNbX79FGcQp55U1_k",
  authDomain: "hitpause-85f82.firebaseapp.com",
  databaseURL: "https://hitpause-85f82.firebaseio.com",
  projectId: "hitpause-85f82",
  storageBucket: "hitpause-85f82.appspot.com",
  messagingSenderId: "199330073037",
  appId: "1:199330073037:web:83c9509289f5eb91a79c84",
  measurementId: "G-557JWXQTPG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;