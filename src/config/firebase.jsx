import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFN4DSGITMl95nbb8SuxtzUNqb_3QQETU",
  authDomain: "prova2-421b5.firebaseapp.com",
  projectId: "prova2-421b5",
  storageBucket: "prova2-421b5.appspot.com",
  messagingSenderId: "894691923674",
  appId: "1:894691923674:web:0743e58005f9dbdd95b7e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firestore
const db = getFirestore(app);


export { db };

