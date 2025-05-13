import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgB3fwkdZBuZrUuAmbcONzwe6x64F4o0E",
  authDomain: "luxury-palette.firebaseapp.com",
  projectId: "luxury-palette",
  storageBucket: "luxury-palette.firebasestorage.app",
  messagingSenderId: "767916337970",
  appId: "1:767916337970:web:4aab7398fd3691a2cf452b",
  measurementId: "G-Y935E13H58"
};

const app = initializeApp(firebaseConfig);

// Avoid analytics if you’re not using it yet
// const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, signInWithEmailAndPassword };
export default db;
