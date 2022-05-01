// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "fir-v9-init.firebaseapp.com",
  projectId: "fir-v9-init",
  storageBucket: "fir-v9-init.appspot.com",
  messagingSenderId: "118884834042",
  appId: "1:118884834042:web:b1f5dc175b7f5df9f6c743",
  measurementId: "G-JCTC2N3C68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)