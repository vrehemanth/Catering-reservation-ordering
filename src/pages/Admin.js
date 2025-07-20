import React from 'react';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../components/admin/Dashboard';

const Admin = () => {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
};

export default Admin;
