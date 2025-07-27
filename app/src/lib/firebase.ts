import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC4vEewpUMAIuMy-q0SnposgqfNaBGYybE",
  authDomain: "xeonhotels.firebaseapp.com",
  projectId: "xeonhotels",
  storageBucket: "xeonhotels.firebasestorage.app",
  messagingSenderId: "195005516299",
  appId: "1:195005516299:web:d4f682bb1e98147a79950e"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export default app; 