import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'backdrop-blur-xl bg-black/60 shadow-lg shadow-purple-500/10' 
            : 'backdrop-blur-md bg-black/40'
        }`}
      >
        {/* Gradient Border Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

        <div className="container mx-auto px-6 sm:px-16 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3"
              >
                {/* Logo Icon */}
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </motion.div>
                  {/* Glow Effect */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl blur-md -z-10"
                  />
                </div>

                <span className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                  MITS Fresher
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <NavLink href="/#">Home</NavLink>
              <NavLink href="/#clubs">Clubs</NavLink>
              <NavLink href="/#video-gallery">Videos</NavLink>
              
              {isLoggedIn && localStorage.getItem('userRole') === 'clubAdmin' && (
                <NavLink to="/my-club" isLink>My Club</NavLink>
              )}
              
              {isLoggedIn && localStorage.getItem('userRole') === 'admin' && (
                <NavLink to="/admin" isLink>Admin</NavLink>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {isLoggedIn ? (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="relative group bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </span>
                </motion.button>
              ) : (
                <>
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-white/10 transition-all border border-white/20"
                    >
                      Login
                    </motion.button>
                  </Link>
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-500/30 overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="relative">Sign Up</span>
                    </motion.button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.svg
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-[73px] right-0 h-[calc(100vh-73px)] w-[280px] z-40 md:hidden"
            >
              <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 p-[2px] h-full rounded-l-3xl">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 h-full rounded-l-3xl p-6 overflow-y-auto">
                  {/* Grid Background */}
                  <div className="absolute inset-0 opacity-5 rounded-l-3xl overflow-hidden">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px',
                    }} />
                  </div>

                  <div className="relative space-y-2">
                    <MobileNavLink href="/#" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
                    <MobileNavLink href="/#clubs" onClick={() => setIsMobileMenuOpen(false)}>Clubs</MobileNavLink>
                    <MobileNavLink href="/#video-gallery" onClick={() => setIsMobileMenuOpen(false)}>Videos</MobileNavLink>
                    
                    {isLoggedIn && localStorage.getItem('userRole') === 'clubAdmin' && (
                      <MobileNavLink to="/my-club" isLink onClick={() => setIsMobileMenuOpen(false)}>My Club</MobileNavLink>
                    )}
                    
                    {isLoggedIn && localStorage.getItem('userRole') === 'admin' && (
                      <MobileNavLink to="/admin" isLink onClick={() => setIsMobileMenuOpen(false)}>Admin Dashboard</MobileNavLink>
                    )}

                    <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent my-4" />

                    {isLoggedIn ? (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30"
                      >
                        Logout
                      </motion.button>
                    ) : (
                      <div className="space-y-2">
                        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="w-full text-white px-6 py-3 rounded-xl font-semibold bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
                          >
                            Login
                          </motion.button>
                        </Link>
                        <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-500/30"
                          >
                            Sign Up
                          </motion.button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Desktop Nav Link Component
const NavLink = ({ href, to, children, isLink }) => {
  const content = (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-4 py-2 text-white font-semibold rounded-lg hover:bg-white/10 transition-all group"
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 origin-left"
      />
    </motion.div>
  );

  return isLink ? <Link to={to}>{content}</Link> : <a href={href}>{content}</a>;
};

// Mobile Nav Link Component
const MobileNavLink = ({ href, to, children, isLink, onClick }) => {
  const content = (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className="relative px-5 py-3 text-white font-semibold rounded-xl hover:bg-white/10 transition-all group overflow-hidden"
    >
      {/* Hover Gradient */}
      <motion.div
        initial={{ x: '-100%' }}
        whileHover={{ x: 0 }}
        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-xl"
      />
      
      <div className="relative flex items-center justify-between">
        <span>{children}</span>
        <svg className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.div>
  );

  return isLink ? (
    <Link to={to} onClick={onClick}>{content}</Link>
  ) : (
    <a href={href} onClick={onClick}>{content}</a>
  );
};

export default Navbar;