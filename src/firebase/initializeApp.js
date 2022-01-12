// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBT5Qx872wDmBlGP80_fq21EpyPYo5feNo",
  authDomain: "jhonnymec-d7e44.firebaseapp.com",
  databaseURL: "https://jhonnymec-d7e44-default-rtdb.firebaseio.com",
  projectId: "jhonnymec-d7e44",
  storageBucket: "jhonnymec-d7e44.appspot.com",
  messagingSenderId: "323944615345",
  appId: "1:323944615345:web:b62f932752de64817ac190"
};

// Initialize Firebase

export const firebase = () => {
    initializeApp(firebaseConfig);
}
export const storage = getStorage(initializeApp(firebaseConfig))

// const app = initializeApp(firebaseConfig); 
