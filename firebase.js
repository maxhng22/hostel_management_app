import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import auth from '@react-native-firebase/auth';
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getStorage, ref } from "firebase/storage";

// Create a root reference

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAT8mO4cKjtbIOTAwfUltQ2kE_2kYbI54",
  authDomain: "hostels-app-22750.firebaseapp.com",
  projectId: "hostels-app-22750",
  storageBucket: "hostels-app-22750.appspot.com",
  messagingSenderId: "28538464157",
  appId: "1:28538464157:web:d52949064326092a53b174",
  measurementId: "G-WHDJQ325GV"
};

// Initialize Firebase
const firebase  = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();


export { firebase ,auth ,db,storage};