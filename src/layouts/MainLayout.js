import React from 'react';
import { Container } from 'react-bootstrap';

const MainLayout = ({ children }) => {
  return (
    <>
      <Container className="py-4">
        {children}
      </Container>
    </>
  );
};

export default MainLayout;
