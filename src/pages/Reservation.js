import React from 'react';
import MainLayout from '../layouts/MainLayout';
import ReservationForm from '../components/reservation/ReservationForm';
import ReservationList from '../components/reservation/ReservationList';

const Reservation = () => {
  return (
    <MainLayout>
      <h2>Make a Reservation</h2>
      <ReservationForm />
      <hr />
      <h4>Your Reservations</h4>
      <ReservationList />
    </MainLayout>
  );
};

export default Reservation;
