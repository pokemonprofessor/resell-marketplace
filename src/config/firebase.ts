import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "paysfer-web.firebaseapp.com",
  projectId: "paysfer-web",
  storageBucket: "paysfer-web.appspot.com",
  messagingSenderId: "1007639733410",
  appId: "1:1007639733410:web:791cefa01e1ef190fae3fb",
  measurementId: "G-VHTQGSKH9B",
};

const app = firebase.initializeApp(firebaseConfig);

export default app;
