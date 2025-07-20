import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCGMxzsxSU3IGHY2wZfpe_jWpnj5LbgOYU",
  authDomain: "catering-reserve.firebaseapp.com",
  projectId: "catering-reserve",
  storageBucket: "catering-reserve.firebasestorage.app",
  messagingSenderId: "762387931179",
  appId: "1:762387931179:web:909397e44d9eeee3584a6e",
  measurementId: "G-40C43F855V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };