
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDV573kBC_a0nE8NqJjcOKxvHyYIVF_Q6w",
    authDomain: "history-data-grabber.firebaseapp.com",
    projectId: "history-data-grabber",
    storageBucket: "history-data-grabber.firebasestorage.app",
    messagingSenderId: "674902522735",
    appId: "1:674902522735:web:3dc53d23828bf01f14069a",
    measurementId: "G-7H60Q4YXS9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };