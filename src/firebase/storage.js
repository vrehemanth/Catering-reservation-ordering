// File: src/firebase/storage.js
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

// Upload a file
export const uploadFile = async (file, path = 'uploads') => {
  const storageRef = ref(storage, `${path}/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

// Delete a file
export const deleteFile = async (fileUrl) => {
  const storageRef = ref(storage, fileUrl);
  await deleteObject(storageRef);
};
