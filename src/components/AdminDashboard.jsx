import React, { useState, useEffect } from 'react';
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
    ? [{ name: 'name', label: 'Club Name' }, { name: 'description', label: 'Description' }, { name: 'image', label: 'Image URL' }]
    : [{ name: 'title', label: 'Video Title' }, { name: 'url', label: 'YouTube URL' }, { name: 'description', label: 'Description' }];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Edit {type === 'club' ? 'Club' : 'Video'}</h2>
        <form onSubmit={handleSubmit}>
          {fields.map(field => (
            <div className="mb-4" key={field.name}>
              <label className="block mb-2">{field.label}</label>
              <input 
                type="text" 
                name={field.name} 
                value={formData[field.name]} 
                onChange={handleChange} 
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg" 
                required 
              />
            </div>
          ))}
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onCancel} className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};


const AdminDashboard = () => {
  // State for data
  const [clubs, setClubs] = useState([]);
  const [videos, setVideos] = useState([]);
  
  // State for forms
  const [newClubData, setNewClubData] = useState({ name: '', description: '', image: '' });
  const [newVideoData, setNewVideoData] = useState({ title: '', url: '', description: '' });

  // State for UI
  const [editingItem, setEditingItem] = useState(null);
  const [itemType, setItemType] = useState(null);
  const [clubTab, setClubTab] = useState('manage'); // 'manage' or 'add'
  const [videoTab, setVideoTab] = useState('manage'); // 'manage' or 'add'

  const getToken = () => localStorage.getItem('token');

  // Fetch all data on component mount
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

  // --- Form Change Handlers ---
  const handleNewClubChange = (e) => setNewClubData({ ...newClubData, [e.target.name]: e.target.value });
  const handleNewVideoChange = (e) => setNewVideoData({ ...newVideoData, [e.target.name]: e.target.value });

  // --- Submit Handlers ---
  const handleAddClubSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/clubs', newClubData, { headers: { 'Authorization': `Bearer ${getToken()}` } });
      alert('Club added successfully!');
      setNewClubData({ name: '', description: '', image: '' });
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

  // --- Delete Handlers ---
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

  // --- Update Handlers ---
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
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-4xl font-bold text-center mb-10">Admin Dashboard</h1>
      
      {editingItem && <EditModal item={editingItem} onSave={handleSave} onCancel={() => setEditingItem(null)} type={itemType} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Clubs Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Clubs</h2>
          <div className="flex border-b border-gray-600 mb-4">
            <button onClick={() => setClubTab('manage')} className={`py-2 px-4 ${clubTab === 'manage' ? 'border-b-2 border-blue-500' : ''}`}>Manage</button>
            <button onClick={() => setClubTab('add')} className={`py-2 px-4 ${clubTab === 'add' ? 'border-b-2 border-blue-500' : ''}`}>Add New</button>
          </div>

          {clubTab === 'manage' ? (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {clubs.map(club => (
                <div key={club._id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                  <span className="font-semibold">{club.name}</span>
                  <div className="space-x-2">
                    <button onClick={() => handleEdit(club, 'club')} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                    <button onClick={() => handleDeleteClub(club._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleAddClubSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Club Name</label>
                <input type="text" name="name" value={newClubData.name} onChange={handleNewClubChange} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea name="description" value={newClubData.description} onChange={handleNewClubChange} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Image URL</label>
                <input type="text" name="image" value={newClubData.image} onChange={handleNewClubChange} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg" required />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">Add Club</button>
            </form>
          )}
        </div>

        {/* Videos Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Videos</h2>
          <div className="flex border-b border-gray-600 mb-4">
            <button onClick={() => setVideoTab('manage')} className={`py-2 px-4 ${videoTab === 'manage' ? 'border-b-2 border-blue-500' : ''}`}>Manage</button>
            <button onClick={() => setVideoTab('add')} className={`py-2 px-4 ${videoTab === 'add' ? 'border-b-2 border-blue-500' : ''}`}>Add New</button>
          </div>

          {videoTab === 'manage' ? (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {videos.map(video => (
                <div key={video._id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                  <span className="font-semibold truncate w-60">{video.title}</span>
                  <div className="space-x-2">
                    <button onClick={() => handleEdit(video, 'video')} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                    <button onClick={() => handleDeleteVideo(video._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleAddVideoSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Video Title</label>
                <input type="text" name="title" value={newVideoData.title} onChange={handleNewVideoChange} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">YouTube URL</label>
                <input type="text" name="url" value={newVideoData.url} onChange={handleNewVideoChange} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea name="description" value={newVideoData.description} onChange={handleNewVideoChange} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg" required />
              </div>
              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300">Add Video</button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
