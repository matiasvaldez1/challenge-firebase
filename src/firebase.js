import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_FIREBASE_API_KEY,
  authDomain: process.env.REACT_AUTH_DOMAIN,
  projectId: "fir-challenge-dcd04",
  storageBucket: process.env.REACT_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_MESSAGING_ID,
  appId: process.env.REACT_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)