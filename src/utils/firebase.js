// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDecTzGQ08fh_tj88Z2qCEt1_tbQYHWuvM",
  authDomain: "netflixgpt-1ebe3.firebaseapp.com",
  projectId: "netflixgpt-1ebe3",
  storageBucket: "netflixgpt-1ebe3.appspot.com",
  messagingSenderId: "248779607039",
  appId: "1:248779607039:web:e6e91d53adfdacd4f275ca",
  measurementId: "G-Q238V67Z8T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
