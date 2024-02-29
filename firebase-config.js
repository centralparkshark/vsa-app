// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//should use an env file to hide api keys
const firebaseConfig = {
  apiKey: "AIzaSyA5fl3ZRMnuSoneg4v8wKhF77x6uAsjG1U",
  authDomain: "hhcrestock.firebaseapp.com",
  projectId: "hhcrestock",
  storageBucket: "hhcrestock.appspot.com",
  messagingSenderId: "162745579623",
  appId: "1:162745579623:web:192a17fcf3090767cb3cc2",
  measurementId: "G-K77TR80V19"
};

// Initialize Firebase
const app = !getApps().length? initializeApp(firebaseConfig): getApp();
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;