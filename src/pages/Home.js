import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <MainLayout>
      <div className="text-center">
        <h1>Welcome to Catering Service</h1>
        <p>Your one-stop solution for reservations and ordering food.</p>
        <Link to="/ordering">
          <Button variant="primary" className="m-2">Order Now</Button>
        </Link>
        <Link to="/reservation">
          <Button variant="success" className="m-2">Make a Reservation</Button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default Home;
