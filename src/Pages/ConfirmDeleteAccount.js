import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ConfirmDeleteAccount = () => {
  const { token } = useParams(); // Get token from URL
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const confirmAccountDeletion = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4055/api/users/confirm-delete-account/${token}`
        );

        if (response.status === 200) {
          setMessage(response.data.message);
          setTimeout(() => {
            navigate('/delete-account');
          }, 1000);
        }

      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message || 'An error occurred');
        } else if (error.request) {
          setMessage('No response from the server. Please try again later.');
        } else {
          setMessage('An error occurred while processing the request.');
        }
      } finally {
        setLoading(false);
      }
    };

    confirmAccountDeletion();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Confirm Account Deletion</h1>

        {loading ? (
          <p className="text-gray-700 mb-4">Processing your request...</p>
        ) : (
          <p
            className={`mb-4 ${message.toLowerCase().includes('success') ? 'text-green-600 font-medium' : 'text-red-600'
              }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfirmDeleteAccount;
