import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ClubAdminDashboard = () => {
  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', googleFormLink: '', promoVideoUrl: '' });
  const [posterFile, setPosterFile] = useState(null);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: '', googleFormLink: '', promoVideoUrl: '' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getToken = () => localStorage.getItem('token');

  const fetchClubData = async () => {
    try {
      const config = { headers: { 'Authorization': `Bearer ${getToken()}` } };
      const userRes = await axios.get(`${backendUrl}/api/auth/me`, config);
      const clubId = userRes.data.associatedClub;

      if (clubId) {
        const clubRes = await axios.get(`${backendUrl}/api/clubs/${clubId}`);
        setClub(clubRes.data);

        const eventsRes = await axios.get(`${backendUrl}/api/events/club/${clubId}`, config);
        setEvents(eventsRes.data);
      }
    } catch (error) {
      console.error("Error fetching club data:", error);
    }
  };

  useEffect(() => {
    fetchClubData();
  }, []);

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPosterFile(e.target.files[0]);
  };

  const handleMainImageFileChange = (e) => {
    setMainImageFile(e.target.files[0]);
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newEvent.title);
    formData.append('googleFormLink', newEvent.googleFormLink);
    formData.append('promoVideoUrl', newEvent.promoVideoUrl);
    if (posterFile) {
      formData.append('poster', posterFile);
    }
    if (mainImageFile) {
      formData.append('mainImage', mainImageFile);
    }

    try {
      const config = { headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' } };
      await axios.post(`${backendUrl}/api/events/club/${club._id}`, formData, config);
      alert('Event added successfully!');
      fetchClubData();
      setNewEvent({ title: '', googleFormLink: '', promoVideoUrl: '' });
      setPosterFile(null);
      setMainImageFile(null);
    } catch (error) {
      alert('Failed to add event.');
      console.error("Error adding event:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const config = { headers: { 'Authorization': `Bearer ${getToken()}` } };
        await axios.delete(`${backendUrl}/api/events/${eventId}`, config);
        fetchClubData();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setEditFormData({ title: event.title, googleFormLink: event.googleFormLink, promoVideoUrl: event.promoVideoUrl });
  };

  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', editFormData.title);
    formData.append('googleFormLink', editFormData.googleFormLink);
    formData.append('promoVideoUrl', editFormData.promoVideoUrl);
    if (posterFile) {
      formData.append('poster', posterFile);
    }
    if (mainImageFile) {
      formData.append('mainImage', mainImageFile);
    }

    try {
      const config = { headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' } };
      await axios.patch(`${backendUrl}/api/events/${editingEvent._id}`, formData, config);
      alert('Event updated successfully!');
      fetchClubData();
      setEditingEvent(null);
      setPosterFile(null);
      setMainImageFile(null);
    } catch (error) {
      alert('Failed to update event.');
      console.error("Error updating event:", error);
    }
  };

  if (!club) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black py-20">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Gradient Orbs with Mouse Parallax */}
      <motion.div
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ 
          x: { type: "spring", stiffness: 20, damping: 30 },
          y: { type: "spring", stiffness: 20, damping: 30 },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-3xl opacity-30"
      />
      
      <motion.div
        animate={{
          x: -mousePosition.x,
          y: -mousePosition.y,
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ 
          x: { type: "spring", stiffness: 20, damping: 30 },
          y: { type: "spring", stiffness: 20, damping: 30 },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 25, repeat: Infinity, ease: "linear" }
        }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-3xl opacity-30"
      />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 sm:px-16">
        {/* Title Section */}
        <div className="flex items-start gap-5 mb-12">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg shadow-violet-500/50"
            />
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "10rem" }}
              transition={{ duration: 1, delay: 0.4 }}
              className="w-1 bg-gradient-to-b from-violet-500 via-purple-500 to-transparent"
            />
          </div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-3"
            >
              {club.name}
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl text-gray-400 mb-4"
            >
              Club Management Dashboard
            </motion.h2>
            
            {/* Animated Underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
            />
          </div>
        </div>

        {/* Add New Event Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 p-[2px] rounded-3xl">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-white/10 backdrop-blur-sm relative overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px',
                }} />
              </div>

              <div className="relative flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white">Add New Event</h3>
              </div>

              <form onSubmit={handleAddEvent} className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    required
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="googleFormLink"
                    placeholder="Google Form Link"
                    value={newEvent.googleFormLink}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="promoVideoUrl"
                    placeholder="YouTube Promo Video URL"
                    value={newEvent.promoVideoUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                  <div>
                    <label className="block mb-2 text-sm text-gray-400 font-semibold">Event Poster/Image</label>
                    <input
                      type="file"
                      name="poster"
                      onChange={handleFileChange}
                      className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-600 file:to-pink-600 file:text-white hover:file:from-purple-700 hover:file:to-pink-700 file:cursor-pointer transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-400 font-semibold">Main Image</label>
                    <input
                      type="file"
                      name="mainImage"
                      onChange={handleMainImageFileChange}
                      className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-cyan-600 file:to-blue-600 file:text-white hover:file:from-cyan-700 hover:file:to-blue-700 file:cursor-pointer transition-all"
                      required
                    />
                  </div>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/30 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Event
                  </span>
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Manage Existing Events */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 p-[2px] rounded-3xl">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-white/10 backdrop-blur-sm relative overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px',
                }} />
              </div>

              <div className="relative flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white">Manage Existing Events</h3>
              </div>

              <div className="space-y-4 relative">
                {events.length > 0 ? events.map((event, index) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 backdrop-blur-sm p-5 rounded-2xl flex justify-between items-center border border-white/10 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                      <span className="font-semibold text-white text-lg">{event.title}</span>
                    </div>
                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => handleEditClick(event)}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-5 py-2 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg shadow-yellow-500/30"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteEvent(event._id)}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/30"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </motion.div>
                )) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-lg">No events found for this club.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Edit Event Modal */}
      <AnimatePresence>
        {editingEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={() => setEditingEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 p-[2px] rounded-3xl">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 relative overflow-hidden">
                  {/* Grid Background */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '30px 30px',
                    }} />
                  </div>

                  <div className="relative flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-white">Edit Event</h3>
                  </div>

                  <form onSubmit={handleUpdateEvent} className="relative">
                    <div className="grid grid-cols-1 gap-6">
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        name="title"
                        placeholder="Event Title"
                        value={editFormData.title}
                        onChange={handleEditFormChange}
                        className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        required
                      />
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        name="googleFormLink"
                        placeholder="Google Form Link"
                        value={editFormData.googleFormLink}
                        onChange={handleEditFormChange}
                        className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      />
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        name="promoVideoUrl"
                        placeholder="YouTube Promo Video URL"
                        value={editFormData.promoVideoUrl}
                        onChange={handleEditFormChange}
                        className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      />
                      <div>
                        <label className="block mb-2 text-sm text-gray-400 font-semibold">Event Poster/Image</label>
                        <input
                          type="file"
                          name="poster"
                          onChange={handleFileChange}
                          className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-600 file:to-pink-600 file:text-white hover:file:from-purple-700 hover:file:to-pink-700 file:cursor-pointer transition-all"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm text-gray-400 font-semibold">Main Image</label>
                        <input
                          type="file"
                          name="mainImage"
                          onChange={handleMainImageFileChange}
                          className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-cyan-600 file:to-blue-600 file:text-white hover:file:from-cyan-700 hover:file:to-blue-700 file:cursor-pointer transition-all"
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <motion.button
                        type="button"
                        onClick={() => setEditingEvent(null)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-500/30 relative overflow-hidden group"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="relative">Update Event</span>
                      </motion.button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner Decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        className="absolute top-0 left-0 w-64 h-64 border-l-4 border-t-4 border-purple-500/30 rounded-tl-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-0 right-0 w-64 h-64 border-r-4 border-b-4 border-cyan-500/30 rounded-br-3xl"
      />
    </section>
  );
};

export default ClubAdminDashboard;