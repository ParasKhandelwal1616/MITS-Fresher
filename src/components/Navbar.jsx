import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, duration: 0.5 }}
      className="fixed top-0 w-full z-50 backdrop-blur-md bg-gray-900 bg-opacity-80 p-4"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          College Dashboard
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <motion.a whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }} href="/#" className="text-white hover:text-purple-300">Home</motion.a>
          <motion.a whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }} href="/#clubs" className="text-white hover:text-purple-300">Clubs</motion.a>
          <motion.a whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }} href="/#video-gallery" className="text-white hover:text-purple-300">Videos</motion.a>
          {isLoggedIn && localStorage.getItem('userRole') === 'clubAdmin' && (
            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link to="/my-club" className="text-white font-bold hover:text-purple-300">My Club</Link>
            </motion.div>
          )}
          {isLoggedIn && localStorage.getItem('userRole') === 'admin' && (
            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link to="/admin" className="text-white font-bold hover:text-purple-300">Admin Dashboard</Link>
            </motion.div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300">
              Logout
            </motion.button>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link to="/login" className="text-white hover:text-purple-300">Login</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">Sign Up</Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;