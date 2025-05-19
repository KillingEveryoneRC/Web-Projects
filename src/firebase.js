// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Встав сюди свої налаштування Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD2oHCNTuC7n7x2etmn8s5cgyQ8dqK3RoM",
    authDomain: "jobfinder-d4837.firebaseapp.com",
    projectId: "jobfinder-d4837",
    storageBucket: "jobfinder-d4837.firebasestorage.app",
    messagingSenderId: "833478471602",
    appId: "1:833478471602:web:f64d7df523dafc04cd7eab",
    measurementId: "G-Z61QK2E3HG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
