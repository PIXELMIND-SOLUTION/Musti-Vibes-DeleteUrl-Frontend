import React, { useState } from 'react';
import axios from 'axios';

const DeleteAccount = () => {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://narda-delete-backend.onrender.com/api/users/deleteaccount',
        { email, reason }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-md">
        {/* 🔝 Added section */}
        <div className="mb-6">
          <p className="text-lg font-bold text-gray-800">
            Delete your Dharmadhwajam account
          </p>
        </div>


        <h1 className="text-2xl font-bold text-blue-600 mb-4">Delete Your Account</h1>

        <p className="text-gray-700 mb-4">
          If you wish to delete your account and all associated data, please provide the following details.
        </p>

        <form onSubmit={handleDeleteAccount} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
              Reason for Deletion
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            {loading ? 'Processing...' : 'Delete Account'}
          </button>
        </form>

        {message && <p className="mt-4 text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default DeleteAccount;
