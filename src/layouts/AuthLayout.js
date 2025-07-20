// File: src/layouts/AuthLayout.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const AuthLayout = ({ children }) => {
  return (
    <>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="p-4 shadow-sm">
              {children}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AuthLayout;
