/** @format */

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgPJTv7Bl_kiMJ6HCjblrPmF837zBJzzQ",
  authDomain: "aas-4th-year.firebaseapp.com",
  databaseURL:
    "https://aas-4th-year-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "aas-4th-year",
  storageBucket: "aas-4th-year.appspot.com",
  messagingSenderId: "807122202905",
  appId: "1:807122202905:web:4412fbb04053792aab9588",
};

// Initialize Firebase app

export const FIRBASEAPP = initializeApp(firebaseConfig);
export const FIREBASEDATABASE = getDatabase(FIRBASEAPP);
export const FIREBASEFIRESTORE = getFirestore(FIRBASEAPP);

export const OPEN_AI_API_KEY =
  "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";
