import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <MainLayout>
      <div className="text-center">
        <h2>404 - Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-outline-primary mt-3">Go Back Home</Link>
      </div>
    </MainLayout>
  );
};

export default NotFound;
