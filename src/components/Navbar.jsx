import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">College Dashboard</Link>
        <div className="hidden md:flex items-center space-x-4">
          <a href="/#" className="text-white">Home</a>
          <a href="/#clubs" className="text-white">Clubs</a>
          <a href="/#video-gallery" className="text-white">Videos</a>
          {isLoggedIn && localStorage.getItem('userRole') === 'clubAdmin' && (
            <Link to="/my-club" className="text-white font-bold">My Club</Link>
          )}
          {isLoggedIn && localStorage.getItem('userRole') === 'admin' && (
            <Link to="/admin" className="text-white font-bold">Admin Dashboard</Link>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300">Logout</button>
          ) : (
            <>
              <Link to="/login" className="text-white">Login</Link>
              <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;