import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../components/Toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    associatedClub: ''
  });
  const [availableClubs, setAvailableClubs] = useState([]);

  const showToast = useToast();

  const { name, email, password, role, associatedClub } = formData;

  useEffect(() => {
    if (role === 'clubAdmin') {
      const fetchAvailableClubs = async () => {
        try {
          const { data } = await axios.get('/api/clubs/available');
          setAvailableClubs(data);
        } catch (error) {
          console.error('Error fetching available clubs:', error);
          showToast('Error fetching available clubs.', 'error');
        }
      };
      fetchAvailableClubs();
    } else {
      setAvailableClubs([]);
    }
  }, [role, showToast]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/signup', formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.role);
      showToast('Signup successful!', 'success');
      window.location.href = '/'; // Redirect to homepage after signup
    } catch (error) {
      const message = error.response?.data?.message || 'An unknown error occurred during signup.';
      showToast(`Signup Failed: ${message}`, 'error');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-md w-96 text-gray-900">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Role</label>
          <select name="role" value={role} onChange={onChange} className="w-full px-3 py-2 border rounded-lg">
            <option value="student">Student</option>
            <option value="clubAdmin">Club Admin</option>
          </select>
        </div>
        {role === 'clubAdmin' && (
          <div className="mb-6">
            <label className="block text-gray-700">Select Your Club</label>
            <select name="associatedClub" value={associatedClub} onChange={onChange} className="w-full px-3 py-2 border rounded-lg" required>
              <option value="" disabled>--Please choose a club--</option>
              {availableClubs.length > 0 ? (
                availableClubs.map(club => (
                  <option key={club._id} value={club._id}>{club.name}</option>
                ))
              ) : (
                <option disabled>No clubs available for admin registration</option>
              )}
            </select>
          </div>
        )}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
