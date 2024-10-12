// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDEJZOZNq7t4CuhWwjE_Br9itrZCUzCzVQ",
    authDomain: "ai-itinerary-ca2ac.firebaseapp.com",
    projectId: "ai-itinerary-ca2ac",
    storageBucket: "ai-itinerary-ca2ac.appspot.com",
    messagingSenderId: "396753775875",
    appId: "1:396753775875:web:aa4339244e346320030d36",
    measurementId: "G-MMYTTL38BB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);