import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu4F4HZ_IBF6h_K4C_ivhk1LxHpa3qKkY",
  authDomain: "planify-project-manageme-3db7b.firebaseapp.com",
  projectId: "planify-project-manageme-3db7b",
  storageBucket: "planify-project-manageme-3db7b.firebasestorage.app",
  messagingSenderId: "570588374549",
  appId: "1:570588374549:web:178717ba9df9ccb065901c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize firestore service
const firestoreDB = getFirestore(app);
const firebaseAuth = getAuth(app);
const createTimeStamp = Timestamp;

export { firestoreDB, firebaseAuth, createTimeStamp };
