
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getAnalytics, type Analytics } from "firebase/analytics"; // Added Analytics import
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZQ5rOCfJBIhiS82UGbsc4gYhfPi_oLKk",
  authDomain: "Worklance-460211.firebaseapp.com",
  projectId: "Worklance-460211",
  storageBucket: "Worklance-460211.appspot.com", // Corrected to standard .appspot.com format
  messagingSenderId: "1088065186564",
  appId: "1:1088065186564:web:647304b854384474967e51",
  measurementId: "G-WK1S7YPTTM"
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
let analytics: Analytics | null = null; // Initialize analytics as null

if (typeof window !== 'undefined') { // Ensure Firebase Analytics is only initialized on the client-side
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.error("Failed to initialize Firebase Analytics:", error);
    // Optionally, you could disable analytics features if initialization fails
  }
}


export { app, auth, analytics };
