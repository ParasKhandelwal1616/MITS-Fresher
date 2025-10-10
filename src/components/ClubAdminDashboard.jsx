import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClubAdminDashboard = () => {
  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', googleFormLink: '', promoVideoUrl: '' });
  const [posterFile, setPosterFile] = useState(null);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: '', googleFormLink: '', promoVideoUrl: '' });

  const getToken = () => localStorage.getItem('token');

  const fetchClubData = async () => {
    try {
      const config = { headers: { 'Authorization': `Bearer ${getToken()}` } };
      const userRes = await axios.get('/api/auth/me', config);
      const clubId = userRes.data.associatedClub;

      if (clubId) {
        const clubRes = await axios.get(`/api/clubs/${clubId}`);
        setClub(clubRes.data);

        const eventsRes = await axios.get(`/api/events/club/${clubId}`, config);
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
      await axios.post(`/api/events/club/${club._id}`, formData, config);
      alert('Event added successfully!');
      fetchClubData();
      setNewEvent({ title: '', googleFormLink: '', promoVideoUrl: '' });
      setPosterFile(null);
    } catch (error) {
      alert('Failed to add event.');
      console.error("Error adding event:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const config = { headers: { 'Authorization': `Bearer ${getToken()}` } };
        await axios.delete(`/api/events/${eventId}`, config);
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
    formData.append('promoVideoUrl', editFormData.promoVideoUrl);
    if (posterFile) {
      formData.append('poster', posterFile);
    }
    if (mainImageFile) {
      formData.append('mainImage', mainImageFile);
    }

    try {
      const config = { headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' } };
      await axios.patch(`/api/events/${editingEvent._id}`, formData, config);
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
    return <div className="text-center mt-20">Loading Club Data...</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-4xl font-bold text-center mb-2">{club.name}</h1>
      <h2 className="text-2xl text-center text-gray-400 mb-10">Club Management Dashboard</h2>

      {/* Add New Event Form */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-12">
        <h3 className="text-2xl font-bold mb-6">Add New Event</h3>
        <form onSubmit={handleAddEvent}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="title" placeholder="Event Title" value={newEvent.title} onChange={handleInputChange} className="w-full px-3 py-2 bg-gray-700 rounded-lg" required />
            <input type="text" name="googleFormLink" placeholder="Google Form Link" value={newEvent.googleFormLink} onChange={handleInputChange} className="w-full px-3 py-2 bg-gray-700 rounded-lg" />
            <input type="text" name="promoVideoUrl" placeholder="YouTube Promo Video URL" value={newEvent.promoVideoUrl} onChange={handleInputChange} className="w-full px-3 py-2 bg-gray-700 rounded-lg" />
            <div>
              <label className="block mb-2 text-sm text-gray-400">Event Poster/Image</label>
              <input type="file" name="poster" onChange={handleFileChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">Main Image</label>
              <input type="file" name="mainImage" onChange={handleMainImageFileChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required />
            </div>
          </div>
          <button type="submit" className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">Add Event</button>
        </form>
      </div>
      {/* Manage Existing Events */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-6">Manage Existing Events</h3>
        <div className="space-y-4">
          {events.length > 0 ? events.map(event => (
            <div key={event._id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
              <span className="font-semibold">{event.title}</span>
              <div>
                <button onClick={() => handleEditClick(event)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2">Edit</button>
                <button onClick={() => handleDeleteEvent(event._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
              </div>
            </div>
          )) : (
            <p className="text-gray-400">No events found for this club.</p>
          )}
        </div>
      </div>

      {/* Edit Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-1/2">
            <h3 className="text-2xl font-bold mb-6">Edit Event</h3>
            <form onSubmit={handleUpdateEvent}>
              <div className="grid grid-cols-1 gap-6">
                <input type="text" name="title" placeholder="Event Title" value={editFormData.title} onChange={handleEditFormChange} className="w-full px-3 py-2 bg-gray-700 rounded-lg" required />
                <input type="text" name="googleFormLink" placeholder="Google Form Link" value={editFormData.googleFormLink} onChange={handleEditFormChange} className="w-full px-3 py-2 bg-gray-700 rounded-lg" />
                <input type="text" name="promoVideoUrl" placeholder="YouTube Promo Video URL" value={editFormData.promoVideoUrl} onChange={handleEditFormChange} className="w-full px-3 py-2 bg-gray-700 rounded-lg" />
                <div>
                  <label className="block mb-2 text-sm text-gray-400">Event Poster/Image</label>
                  <input type="file" name="poster" onChange={handleFileChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-400">Main Image</label>
                  <input type="file" name="mainImage" onChange={handleMainImageFileChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button type="button" onClick={() => setEditingEvent(null)} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 mr-2">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubAdminDashboard;
