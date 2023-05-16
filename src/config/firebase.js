// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM_h6s-ZGSzlPnQP2RnkuGWnZDDqr173I",
  authDomain: "fir-course2-2b900.firebaseapp.com",
  projectId: "fir-course2-2b900",
  storageBucket: "fir-course2-2b900.appspot.com",
  messagingSenderId: "639230519262",
  appId: "1:639230519262:web:b00c4fb60bc68e55d7df4f",
  measurementId: "G-DCN66LD9ZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app)

export const db = getFirestore(app)
export const storage = getStorage(app)