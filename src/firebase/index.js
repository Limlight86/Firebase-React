import firebase from "firebase";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "react-firebase-4625c.firebaseapp.com",
  databaseURL: "https://react-firebase-4625c.firebaseio.com",
  projectId: "react-firebase-4625c",
  storageBucket: "",
  messagingSenderId: "840202695025",
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

console.log("foo", config);
const app = firebase.initializeApp(config);

export const database = app.database();
export const auth = app.auth();
