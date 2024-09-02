// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZg4YSDBzA0-S9YY3iDonParDWZ0G2KTg",
  authDomain: "tp3-fundamentos-c9070.firebaseapp.com",
  projectId: "tp3-fundamentos-c9070",
  storageBucket: "tp3-fundamentos-c9070.appspot.com",
  messagingSenderId: "248172756474",
  appId: "1:248172756474:web:5da58e4755df1d9a227843"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);