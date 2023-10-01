// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIrmZeIw5Rwqsm4JnCbIGyJRQ6GFqCEIQ",
  authDomain: "user-email-password-auth-9b32b.firebaseapp.com",
  projectId: "user-email-password-auth-9b32b",
  storageBucket: "user-email-password-auth-9b32b.appspot.com",
  messagingSenderId: "881037786767",
  appId: "1:881037786767:web:421281ac437fd0e755bafa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
