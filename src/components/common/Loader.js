import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loader() {
  return (
    <div className="text-center my-5">
      <Spinner animation="border" variant="primary" role="status" />
      <p className="mt-2">Loading...</p>
    </div>
  );
}

export default Loader;
