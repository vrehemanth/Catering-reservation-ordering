// File: src/firebase/db.js
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';

/////////////////////
// 🔸 RESERVATIONS //
/////////////////////

export const addReservation = async ({
  name,
  date,
  time,
  guests,
  vegCount,
  nonVegCount,
  message,
  userId
}) => {
  const docRef = await addDoc(collection(db, 'reservations'), {
    name,
    date,
    time,
    guests,
    vegCount,
    nonVegCount,
    message,
    userId,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

export const fetchReservations = async () => {
  const snapshot = await getDocs(collection(db, 'reservations'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deleteReservation = async (id) => {
  await deleteDoc(doc(db, 'reservations', id));
};

export const getReservation = async (id) => {
  const docSnap = await getDoc(doc(db, 'reservations', id));
  return docSnap.exists() ? { id, ...docSnap.data() } : null;
};

export const updateReservation = async (id, updatedData) => {
  await updateDoc(doc(db, 'reservations', id), updatedData);
};

////////////////////
// 🔸 MENU ITEMS //
////////////////////

// Add a new menu item (expects: name, price, description, type)
export const addMenuItem = async (itemData) => {
  const docRef = await addDoc(collection(db, 'menu'), {
    ...itemData,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

// Fetch all menu items
export const fetchMenuItems = async () => {
  const snapshot = await getDocs(collection(db, 'menu'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Delete menu item by ID
export const deleteMenuItem = async (id) => {
  await deleteDoc(doc(db, 'menu', id));
};

// Get specific menu item
export const getMenuItem = async (id) => {
  const docSnap = await getDoc(doc(db, 'menu', id));
  return docSnap.exists() ? { id, ...docSnap.data() } : null;
};

// Update a menu item by ID
export const updateMenuItem = async (id, updatedData) => {
  await updateDoc(doc(db, 'menu', id), updatedData);
};
