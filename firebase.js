// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBszBl8DDINRgkvg-WqJcGBDm3Kne3p7Iw",
  authDomain: "bridge-17f7c.firebaseapp.com",
  projectId: "bridge-17f7c",
  storageBucket: "bridge-17f7c.appspot.com",
  messagingSenderId: "817668688620",
  appId: "1:817668688620:web:cfa9baad3272f1ed1273c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };