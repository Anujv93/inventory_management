// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCh_iLRHPeSgAanfy3C-ZTR9m78xHbw2rI",
  authDomain: "inventory-management-76ffc.firebaseapp.com",
  projectId: "inventory-management-76ffc",
  storageBucket: "inventory-management-76ffc.appspot.com",
  messagingSenderId: "1096956521336",
  appId: "1:1096956521336:web:c11680328f1cd79a9f368d",
  measurementId: "G-NR91Z7DTWM",
};

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(firebase_app);
const auth = getAuth(firebase_app);

export { firebase_app, db, auth };
