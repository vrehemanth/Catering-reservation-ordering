import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { auth } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchReservations = async () => {
      const q = query(collection(db, 'reservations'), where('userId', '==', user?.uid));
      const snapshot = await getDocs(q);
      setReservations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    if (user) fetchReservations();
  }, [user]);

  return (
    <Container className="my-4">
      <h4>Your Reservations</h4>
      {reservations.map(res => (
        <Card key={res.id} className="mb-3">
          <Card.Body>
            <Card.Title>{res.name}</Card.Title>
            <Card.Text><strong>Date:</strong> {res.date}</Card.Text>
            <Card.Text><strong>Time:</strong> {res.time}</Card.Text>
            <Card.Text><strong>Guests:</strong> {res.guests}</Card.Text>
            <Card.Text><strong>Message:</strong> {res.message}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default ReservationList;
