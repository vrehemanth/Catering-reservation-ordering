// File: src/layouts/AdminLayout.js
import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const AdminLayout = ({ children }) => {
  return (
    <>
      <Container fluid className="p-4 bg-light" style={{ minHeight: '100vh' }}>
        {children}
      </Container>
    </>
  );
};

export default AdminLayout;
