import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Container, Card } from 'react-bootstrap';

function ReservationDetails() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      const docRef = doc(db, 'reservations', id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setReservation(snapshot.data());
      }
    };
    fetchReservation();
  }, [id]);

  return (
    <Container className="my-4">
      {reservation ? (
        <Card>
          <Card.Body>
            <Card.Title>Reservation Details</Card.Title>
            <Card.Text><strong>Name:</strong> {reservation.name}</Card.Text>
            <Card.Text><strong>Date:</strong> {reservation.date}</Card.Text>
            <Card.Text><strong>Time:</strong> {reservation.time}</Card.Text>
            <Card.Text><strong>Guests:</strong> {reservation.guests}</Card.Text>
            <Card.Text><strong>Message:</strong> {reservation.message}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading reservation...</p>
      )}
    </Container>
  );
}

export default ReservationDetails;
