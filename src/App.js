// File: src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Home from './pages/Home';
import Reservation from './pages/Reservation';
import Ordering from './pages/Ordering';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ManageReservations  from './components/admin/ManageReservations';
import ManageOrders from './components/admin/ManageOrders';
// Auth
import Login from './components/auth/Login';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';

// Common
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Global Navbar */}
        <Navbar />

        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/reservation" element={<MainLayout><Reservation /></MainLayout>} />
            <Route path="/ordering" element={<MainLayout><Ordering /></MainLayout>} />
            <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
            <Route path="/admin/*" element={<AdminLayout><Admin /></AdminLayout>} />
            <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
            <Route path="/admin/reservations" element={<ManageReservations />} />
            <Route path="/admin/orders" element={<ManageOrders />} />

            {/* Removed register route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
