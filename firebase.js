// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCusxs3VIBKZrdmTB50xrNAtrSs9t2nM-M",
  authDomain: "bridge-ca028.firebaseapp.com",
  projectId: "bridge-ca028",
  storageBucket: "bridge-ca028.appspot.com",
  messagingSenderId: "987103398040",
  appId: "1:987103398040:web:8e20473cbaa85f9372e8ed",
  measurementId: "G-MLQD0DGYFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };