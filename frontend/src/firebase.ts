import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZ92W0RTqHgyro6H-b0-NY3Yc3DnnqTVc",
  authDomain: "education-2e810.firebaseapp.com",
  projectId: "education-2e810",
  storageBucket: "education-2e810.appspot.com",
  messagingSenderId: "554607316094",
  appId: "1:554607316094:web:f851d3e9d8d84d96b6dc2f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signOut };
