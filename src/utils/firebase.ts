import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

// Demo / Starter Firebase Config
// (Replace with your Firebase Console keys from https://console.firebase.google.com)
const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyZenPulseApp123456789",
  authDomain: "zenpulse-app.firebaseapp.com",
  projectId: "zenpulse-app",
  storageBucket: "zenpulse-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:demo123456789"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
};
