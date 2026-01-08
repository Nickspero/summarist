import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsseey0Y8v2uv8Fv63FUWg0g6yZ4cUwmE",
  authDomain: "summarist-63749.firebaseapp.com",
  projectId: "summarist-63749",
  storageBucket: "summarist-63749.firebasestorage.app",
  messagingSenderId: "293002829670",
  appId: "1:293002829670:web:39e53409f953ffc56cf2a7"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)