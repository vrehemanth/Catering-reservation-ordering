import React, { useEffect, useState } from 'react';
import { getCurrentUser, logoutUser } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <Card className="mx-auto text-center" style={{ maxWidth: '400px' }}>
      <Card.Body>
        <Card.Title>Welcome, {user.displayName || 'User'}!</Card.Title>
        <Card.Text>Email: {user.email}</Card.Text>
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
      </Card.Body>
    </Card>
  );
};

export default Profile;
