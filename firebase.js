// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmsjjrkn_xTQcrdXa_0WfhrrJ8hyXbvjU",
  authDomain: "seoulhomes-f44f5.firebaseapp.com",
  projectId: "seoulhomes-f44f5",
  storageBucket: "seoulhomes-f44f5.firebasestorage.app",
  messagingSenderId: "96486796194",
  appId: "1:96486796194:web:df6d6bcdb03e413b7920fb",
  measurementId: "G-25HXBZ5LMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

// Export services
export {
  app,
  auth,
  db,
  storage,
  analytics
};
