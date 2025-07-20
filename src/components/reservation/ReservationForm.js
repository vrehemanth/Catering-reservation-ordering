import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { auth } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

function ReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    vegMeals: '',
    nonVegMeals: '',
    message: ''
  });
  const [success, setSuccess] = useState('');
  const [user] = useAuthState(auth);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getGuestCount = () => {
    const veg = parseInt(formData.vegMeals) || 0;
    const nonVeg = parseInt(formData.nonVegMeals) || 0;
    return veg + nonVeg;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const totalGuests = getGuestCount();

    if (totalGuests <= 0) {
      alert("Please enter at least one guest (veg or non-veg).");
      return;
    }

    try {
      await addDoc(collection(db, 'reservations'), {
        name: formData.name,
        date: formData.date,
        time: formData.time,
        vegMeals: parseInt(formData.vegMeals) || 0,
        nonVegMeals: parseInt(formData.nonVegMeals) || 0,
        totalGuests,
        message: formData.message,
        userId: user?.uid,
        createdAt: Timestamp.now()
      });

      setSuccess('Reservation submitted successfully!');
      setFormData({
        name: '',
        date: '',
        time: '',
        vegMeals: '',
        nonVegMeals: '',
        message: ''
      });
    } catch (err) {
      console.error('Error adding reservation:', err);
    }
  };

  return (
    <Container className="my-4">
      <h3>Make a Reservation</h3>
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="date" className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="time" className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control type="time" name="time" value={formData.time} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="vegMeals" className="mb-3">
          <Form.Label>Vegeterian</Form.Label>
          <Form.Control
            type="number"
            name="vegMeals"
            min="0"
            value={formData.vegMeals}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="nonVegMeals" className="mb-3">
          <Form.Label>Non-Vegeterian</Form.Label>
          <Form.Control
            type="number"
            name="nonVegMeals"
            min="0"
            value={formData.nonVegMeals}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="totalGuests" className="mb-3">
          <Form.Label>Total Guests</Form.Label>
          <Form.Control type="number" value={getGuestCount()} readOnly />
        </Form.Group>

        <Form.Group controlId="message" className="mb-3">
          <Form.Label>Special Instructions</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Submit Reservation</Button>
      </Form>
    </Container>
  );
}

export default ReservationForm;
