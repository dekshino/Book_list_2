// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMn9p7yP7qD3YKqmOt3minX-hPaeudlJY",
  authDomain: "book-list-2.firebaseapp.com",
  projectId: "book-list-2",
  storageBucket: "book-list-2.firebasestorage.app",
  messagingSenderId: "613834759796",
  appId: "1:613834759796:web:35526b28b8545bc3113b21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);