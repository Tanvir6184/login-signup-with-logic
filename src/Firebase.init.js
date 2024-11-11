// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqF-NJSU08FQPNiisfsJFmajxT96QHVho",
  authDomain: "email-pass-auth-8b292.firebaseapp.com",
  projectId: "email-pass-auth-8b292",
  storageBucket: "email-pass-auth-8b292.firebasestorage.app",
  messagingSenderId: "44491766897",
  appId: "1:44491766897:web:3340a25d3ff52121a82fd0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
