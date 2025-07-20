import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

function ManageReservations() {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    const snapshot = await getDocs(collection(db, 'reservations'));
    setReservations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'reservations', id));
    fetchReservations();
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <Container className="my-4">
      <h2>Manage Reservations</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Guests</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              <td>{res.name}</td>
              <td>{res.date}</td>
              <td>{res.guests}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(res.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ManageReservations;
