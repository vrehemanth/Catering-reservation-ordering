import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './config'; // `db` from Firestore

export const registerUser = async (email, password, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // Set display name in Auth profile
  await updateProfile(userCredential.user, { displayName });

  // Save user info in Firestore
  const userDocRef = doc(db, 'users', userCredential.user.uid);
  await setDoc(userDocRef, {
    uid: userCredential.user.uid,
    displayName,
    email,
    createdAt: new Date().toISOString(),
    role: 'user' // You can change or extend this later
  });

  return userCredential.user;
};
// Login user
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout user
export const logoutUser = () => {
  return signOut(auth);
};

// Get current user
export const getCurrentUser = () => auth.currentUser;

// Auth state listener
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
