import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//  Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA6UdrpqooC2xSEwbzwjHzcvb_qtI_2nZo',
  authDomain: 'gabby-hotel.firebaseapp.com',
  projectId: 'gabby-hotel',
  storageBucket: 'gabby-hotel.firebasestorage.app',
  messagingSenderId: ' 458498696965',
  appId: '1:458498696965:web:3cf9163cb31dac253df96c',
  measurementId: "G-9VHL9NJEZ9"
};

//  Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

//  Export instances
export { auth, provider, db };
