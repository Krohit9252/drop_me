import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import getAuth
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv5aBG74g7SSIeSxT4iq0_xTK4KDSJdMQ",
  authDomain: "fatafat-333c3.firebaseapp.com",
  projectId: "fatafat-333c3",
  storageBucket: "fatafat-333c3.appspot.com",
  messagingSenderId: "75827107225",
  appId: "1:75827107225:web:c4909d0c6be6e663f3af08",
  // measurementId: "G-7ED5F9JVZ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Auth
const db = getFirestore(app); // Firestore instance

export { auth,db }; // Export the auth object

