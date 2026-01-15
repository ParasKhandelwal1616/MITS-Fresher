import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from './Toast';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Verification = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-otp`, { email, otp });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const handleResend = async () => {
    setError('');
    setSuccess('');
    try {
      await axios.post(`${backendUrl}/api/auth/resend-otp`, { email });
      setSuccess('A new OTP has been sent to your email.');
      setTimer(30);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  if (!email) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No email address provided. Please sign up again.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-white">Verify Your Email</h2>
        <p className="text-center text-gray-400">
          An OTP has been sent to <strong>{email}</strong>. Please enter it below.
        </p>
        {error && <Toast message={error} type="error" />}
        {success && <Toast message={success} type="success" />}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-400">
              OTP
            </label>
            <div className="mt-1">
              <input
                id="otp"
                name="otp"
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 placeholder-gray-500 bg-gray-800 border border-gray-700 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Verify
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            onClick={handleResend}
            disabled={timer > 0}
            className="text-sm font-medium text-indigo-500 hover:text-indigo-400 disabled:opacity-50"
          >
            Resend OTP {timer > 0 && `in ${timer}s`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verification;
