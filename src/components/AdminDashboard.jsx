import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// Reusable Modal Component for Editing
const EditModal = ({ item, onSave, onCancel, type }) => {
  const [formData, setFormData] = useState(item);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const fields = type === 'club' 
    ? [{ name: 'name', label: 'Club Name' }, { name: 'description', label: 'Description' }, { name: 'image', label: 'Image URL' }, { name: 'instagram', label: 'Instagram Handle' }]
    : [{ name: 'title', label: 'Video Title' }, { name: 'url', label: 'YouTube URL' }, { name: 'description', label: 'Description' }];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-md"
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
                <h2 className="text-3xl font-bold text-white">Edit {type === 'club' ? 'Club' : 'Video'}</h2>
              </div>

              <form onSubmit={handleSubmit} className="relative space-y-4">
                {fields.map(field => (
                  <div key={field.name}>
                    <label className="block mb-2 text-sm text-gray-400 font-semibold">{field.label}</label>
                    {field.name === 'description' ? (
                      <motion.textarea
                        whileFocus={{ scale: 1.02 }}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                        rows="3"
                        required
                      />
                    ) : (
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        required
                      />
                    )}
                  </div>
                ))}
                <div className="flex gap-3 pt-4">
                  <motion.button
                    type="button"
                    onClick={onCancel}
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
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-500/30 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="relative">Save Changes</span>
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const AdminDashboard = () => {
  const [clubs, setClubs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [newClubData, setNewClubData] = useState({ name: '', description: '', image: '', instagram: '' });
  const [newVideoData, setNewVideoData] = useState({ title: '', url: '', description: '' });
  const [editingItem, setEditingItem] = useState(null);
  const [itemType, setItemType] = useState(null);
  const [clubTab, setClubTab] = useState('manage');
  const [videoTab, setVideoTab] = useState('manage');
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

  useEffect(() => {
    fetchClubs();
    fetchVideos();
  }, []);

  const fetchClubs = async () => {
    const { data } = await axios.get('/api/clubs');
    setClubs(data);
  };

  const fetchVideos = async () => {
    const { data } = await axios.get('/api/videos');
    setVideos(data);
  };

  const handleNewClubChange = (e) => setNewClubData({ ...newClubData, [e.target.name]: e.target.value });
  const handleNewVideoChange = (e) => setNewVideoData({ ...newVideoData, [e.target.name]: e.target.value });

  const handleAddClubSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/clubs', newClubData, { headers: { 'Authorization': `Bearer ${getToken()}` } });
      alert('Club added successfully!');
      setNewClubData({ name: '', description: '', image: '', instagram: '' });
      fetchClubs();
      setClubTab('manage');
    } catch (error) {
      alert('Failed to add club.');
    }
  };

  const handleAddVideoSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/videos', newVideoData, { headers: { 'Authorization': `Bearer ${getToken()}` } });
      alert('Video added successfully!');
      setNewVideoData({ title: '', url: '', description: '' });
      fetchVideos();
      setVideoTab('manage');
    } catch (error) {
      alert('Failed to add video.');
    }
  };

  const handleDeleteClub = async (id) => {
    if (window.confirm('Are you sure you want to delete this club?')) {
      try {
        await axios.delete(`/api/clubs/${id}`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
        fetchClubs();
      } catch (error) { console.error('Failed to delete club', error); }
    }
  };

  const handleDeleteVideo = async (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await axios.delete(`/api/videos/${id}`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
        fetchVideos();
      } catch (error) { console.error('Failed to delete video', error); }
    }
  };

  const handleEdit = (item, type) => {
    setEditingItem(item);
    setItemType(type);
  };

  const handleSave = async (updatedItem) => {
    try {
      if (itemType === 'club') {
        await axios.patch(`/api/clubs/${updatedItem._id}`, updatedItem, { headers: { 'Authorization': `Bearer ${getToken()}` } });
        fetchClubs();
      } else if (itemType === 'video') {
        await axios.patch(`/api/videos/${updatedItem._id}`, updatedItem, { headers: { 'Authorization': `Bearer ${getToken()}` } });
        fetchVideos();
      }
    } catch (error) { console.error(`Failed to update ${itemType}`, error); }
    setEditingItem(null);
    setItemType(null);
  };

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

      {/* Gradient Orbs */}
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
              animate={{ height: "6rem" }}
              transition={{ duration: 1, delay: 0.4 }}
              className="w-1 bg-gradient-to-b from-violet-500 via-purple-500 to-transparent"
            />
          </div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4"
            >
              Admin Dashboard
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
            />
          </div>
        </div>

        {editingItem && <EditModal item={editingItem} onSave={handleSave} onCancel={() => setEditingItem(null)} type={itemType} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Clubs Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 p-[2px] rounded-3xl">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-white/10 backdrop-blur-sm relative overflow-hidden min-h-[600px]">
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Clubs</h2>
                </div>

                {/* Tabs */}
                <div className="relative flex gap-2 mb-6 bg-gray-700/30 rounded-xl p-1">
                  <motion.button
                    onClick={() => setClubTab('manage')}
                    className={`relative flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${clubTab === 'manage' ? 'text-white' : 'text-gray-400'}`}
                  >
                    {clubTab === 'manage' && (
                      <motion.div
                        layoutId="clubActiveTab"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg shadow-lg"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative">Manage</span>
                  </motion.button>
                  <motion.button
                    onClick={() => setClubTab('add')}
                    className={`relative flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${clubTab === 'add' ? 'text-white' : 'text-gray-400'}`}
                  >
                    {clubTab === 'add' && (
                      <motion.div
                        layoutId="clubActiveTab"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg shadow-lg"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative">Add New</span>
                  </motion.button>
                </div>

                {clubTab === 'manage' ? (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar relative">
                    {clubs.map((club, index) => (
                      <motion.div
                        key={club._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 backdrop-blur-sm p-4 rounded-xl flex justify-between items-center border border-white/10 group"
                      >
                        <span className="font-semibold text-white">{club.name}</span>
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => handleEdit(club, 'club')}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg shadow-yellow-500/20"
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            onClick={() => handleDeleteClub(club._id)}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/20"
                          >
                            Delete
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleAddClubSubmit} className="space-y-4 relative">
                    <div>
                      <label className="block mb-2 text-sm text-gray-400 font-semibold">Club Name</label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        name="name"
                        value={newClubData.name}
                        onChange={handleNewClubChange}
                        className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-400 font-semibold">Description</label>
                      <motion.textarea
                        whileFocus={{ scale: 1.02 }}
                        name="description"
                        value={newClubData.description}
                        onChange={handleNewClubChange}
                        className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                        rows="3"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-400 font-semibold">Image URL</label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        name="image"
                        value={newClubData.image}
                        onChange={handleNewClubChange}
                        className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-400 font-semibold">Instagram Handle</label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        name="instagram"
                        value={newClubData.instagram}
                        onChange={handleNewClubChange}
                        className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-500/30 relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="relative">Add Club</span>
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

          {/* Videos Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 p-[2px] rounded-3xl">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-white/10 backdrop-blur-sm relative overflow-hidden min-h-[600px]">
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
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Videos</h2>
                </div>

                {/* Tabs */}
                <div className="relative flex gap-2 mb-6 bg-gray-700/30 rounded-xl p-1">
                  <motion.button
                    onClick={() => setVideoTab('manage')}
                    className={`relative flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${videoTab === 'manage' ? 'text-white' : 'text-gray-400'}`}
                  >
                    {videoTab === 'manage' && (
                      <motion.div
                        layoutId="videoActiveTab"
                        className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg shadow-lg"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative">Manage</span>
                  </motion.button>
                  <motion.button
                    onClick={() => setVideoTab('add')}
                    className={`relative flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${videoTab === 'add' ? 'text-white' : 'text-gray-400'}`}
                  >
                    {videoTab === 'add' && (
                      <motion.div
                        layoutId="videoActiveTab"
                        className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg shadow-lg"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative">Add New</span>
                  </motion.button>
                </div>

                {videoTab === 'manage' ? (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar relative">
                    {videos.map((video, index) => (
                      <motion.div
                        key={video._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 backdrop-blur-sm p-4 rounded-xl flex justify-between items-center border border-white/10 group"
                      >
                        <span className="font-semibold text-white truncate flex-1 mr-4">{video.title}</span>
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => handleEdit(video, 'video')}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg shadow-yellow-500/20"
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            onClick={() => handleDeleteVideo(video._id)}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/20"
                          >
                            Delete
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleAddVideoSubmit} className="space-y-4 relative">
                    <div>
                      <label className="block mb-2 text-sm text-gray-400 font-semibold">Video Title</label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        name="title"
                        value={newVideoData.title}
                        onChange={handleNewVideoChange}
                        className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-400 font-semibold">YouTube URL</label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        name="url"
                        value={newVideoData.url}
                        onChange={handleNewVideoChange}
                        className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-400 font-semibold">Description</label>
                      <motion.textarea
                        whileFocus={{ scale: 1.02 }}
                        name="description"
                        value={newVideoData.description}
                        onChange={handleNewVideoChange}
                        className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                        rows="3"
                        required
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/30 relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="relative">Add Video</span>
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

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

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(55, 65, 81, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgb(139, 92, 246), rgb(167, 139, 250));
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, rgb(124, 58, 237), rgb(139, 92, 246));
        }
      `}</style>
    </section>
  );
};

export default AdminDashboard;