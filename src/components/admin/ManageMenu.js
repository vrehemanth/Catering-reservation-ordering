import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import { db } from '../../firebase/config';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

function ManageMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '' });

  const fetchMenu = async () => {
    const snapshot = await getDocs(collection(db, 'menu'));
    setMenuItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'menu'), formData);
    setFormData({ name: '', price: '' });
    fetchMenu();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'menu', id));
    fetchMenu();
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <Container className="my-4">
      

    </Container>
  );
}

export default ManageMenu;
