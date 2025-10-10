import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EventModal from './EventModal';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { clubId } = useParams();
  const backendUrl = 'http://localhost:5000';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`/api/events/club/${clubId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [clubId]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6">Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={() => handleEventClick(event)}>
            <img src={`${backendUrl}${event.mainImageUrl}`} alt={event.title} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <EventModal event={selectedEvent} onClose={handleCloseModal} />
    </div>
  );
};

export default Events;
