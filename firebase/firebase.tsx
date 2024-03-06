import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCjglVVDfl8qqSCZvw96jbgbyRapQXhj2E",
  authDomain: "racars-c3cb8.firebaseapp.com",
  projectId: "racars-c3cb8",
  storageBucket: "racars-c3cb8.appspot.com",
  messagingSenderId: "677915945552",
  appId: "1:677915945552:web:d11bf5fe7695a0d498bf55"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app