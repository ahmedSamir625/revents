import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

//3mlt import lel 7agat eli hts5dmha bs mn l firebase 34an l package kbera fa45

const firebaseConfig = {
  apiKey: "AIzaSyD31x4qGqU4Ocy0MVfFlTjLxuC2Nby3enM",
  authDomain: "re-vents-4d76b.firebaseapp.com",
  projectId: "re-vents-4d76b",
  storageBucket: "re-vents-4d76b.appspot.com",
  messagingSenderId: "1043526400696",
  appId: "1:1043526400696:web:8a982da31d2814369e924d",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
