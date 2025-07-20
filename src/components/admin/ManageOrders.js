// File: src/components/admin/ManageOrders.js
import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const snapshot = await getDocs(collection(db, 'orders'));
    setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'orders', id));
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Container className="my-4">
      <h2>Manage Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Items</th>
            <th>Total ($)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.customerName}</td>
              <td>{order.items?.map(i => i.name).join(', ')}</td>
              <td>{order.total}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(order.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ManageOrders;
