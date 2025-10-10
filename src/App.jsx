import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Component Imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Clubs from './components/Clubs';
import VideoGallery from './components/VideoGallery';
import Login from './components/Login';
import Signup from './components/Signup';
import Events from './components/Events';
import AdminDashboard from './components/AdminDashboard';
import ClubAdminDashboard from './components/ClubAdminDashboard';

// A wrapper for protected routes
const AdminRoute = ({ children }) => {
  const userRole = localStorage.getItem('userRole');
  return userRole === 'admin' ? children : <Navigate to="/login" />;
};

const ClubAdminRoute = ({ children }) => {
  const userRole = localStorage.getItem('userRole');
  return userRole === 'clubAdmin' ? children : <Navigate to="/login" />;
};

// Main App Component
const App = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<>
              <Hero />
              <Clubs />
              <VideoGallery />
            </>} 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/clubs/:clubId/events" element={<Events />} />

          {/* Admin-only Private Route */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route 
            path="/my-club" 
            element={
              <ClubAdminRoute>
                <ClubAdminDashboard />
              </ClubAdminRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;