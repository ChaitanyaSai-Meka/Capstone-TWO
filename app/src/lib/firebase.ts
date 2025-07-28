import { initializeApp, getApps, getApp } from "firebase/app";

// Firebase config using environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyC4vEewpUMAIuMy-q0SnposgqfNaBGYybE",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "xeonhotels.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "xeonhotels",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "xeonhotels.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "195005516299",
  appId: process.env.FIREBASE_APP_ID || "1:195005516299:web:d4f682bb1e98147a79950e"
};

let app: ReturnType<typeof initializeApp>;


if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export default app; 