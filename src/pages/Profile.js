import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import Profile from '../components/auth/Profile';

const ProfilePage = () => {
  return (
    <AuthLayout>
      <Profile />
    </AuthLayout>
  );
};

export default ProfilePage;
