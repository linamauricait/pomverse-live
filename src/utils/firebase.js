// src/utils/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4pQgg3M-eYrojt_-EPQsZkFDaIJYjNYU",
  authDomain: "thepomverse.firebaseapp.com",
  projectId: "thepomverse",
  storageBucket: "thepomverse.firebasestorage.app",
  messagingSenderId: "967877834293",
  appId: "1:967877834293:web:e7f53dc7d2027d13f0237c",
  measurementId: "G-PD6QBDW3GM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Export auth so you can use it in AuthModal
export const auth = getAuth(app);
