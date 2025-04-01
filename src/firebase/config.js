import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlBtd33IQZvnuEvuoGCmiTALmsXnB67nw",
  authDomain: "planify-project-management-app.firebaseapp.com",
  projectId: "planify-project-management-app",
  storageBucket: "planify-project-management-app.firebasestorage.app",
  messagingSenderId: "104550487473",
  appId: "1:104550487473:web:c598078bd61b27a2e75990",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize firestore service
const firestoreDB = getFirestore(app);
const firebaseAuth = getAuth(app);
const createTimeStamp = Timestamp;

export { firestoreDB, firebaseAuth, createTimeStamp };
