// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-project-fec91.firebaseapp.com",
  projectId: "mern-project-fec91",
  storageBucket: "mern-project-fec91.appspot.com",
  messagingSenderId: "812983132086",
  appId: "1:812983132086:web:c105d55127a8781ba46b17"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);