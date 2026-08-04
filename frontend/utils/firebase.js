// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, inMemoryPersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cortexai-de5e8.firebaseapp.com",
  projectId: "cortexai-de5e8",
  storageBucket: "cortexai-de5e8.firebasestorage.app",
  messagingSenderId: "942185247026",
  appId: "1:942185247026:web:7f0e25c567af751b1b672b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, inMemoryPersistence).catch((error) => {
  console.warn("Firebase auth persistence setup failed:", error);
});

export { auth };
export const googleProvider = new GoogleAuthProvider();