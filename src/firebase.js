// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // استيراد Firestore

// الإعدادات الخاصة بمشروعك من Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAUHeIgUuI9H-yAu7YzyTCs2-RtDY2e0jc",
  authDomain: "tourism-31e4e.firebaseapp.com",
  projectId: "tourism-31e4e",
  storageBucket: "tourism-31e4e.appspot.com", // تصحيح اسم التخزين
  messagingSenderId: "764437753975",
  appId: "1:764437753975:web:7dfc713969d10d29ded672",
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // تهيئة Firestore

export { auth, db }; // تصدير كل من auth و db
