import React, { useState } from "react";
import axios from "axios";

const DeleteAccount = () => {
  const [mobile, setMobile] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:4055/api/users/deleteaccount-mobile",
        {
          mobile,
          reason
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      setMessage(response.data.message || "Account deleted successfully");
      setMobile("");
      setReason("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-md">
        {/* Header */}
        <div className="mb-6">
          <p className="text-lg font-bold text-gray-800">
            Delete your Musti Vibes account
          </p>
        </div>

        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Delete Your Account
        </h1>

        <p className="text-gray-700 mb-4">
          If you wish to permanently delete your account and all associated
          data, please confirm your mobile number and reason.
        </p>

        <form onSubmit={handleDeleteAccount} className="space-y-4">
          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="text"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="Enter 10-digit mobile number"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reason for Deletion
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Tell us why you are leaving"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows={3}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
          >
            {loading ? "Processing..." : "Delete Account"}
          </button>
        </form>

        {/* Messages */}
        {message && (
          <p className="mt-4 text-green-600 font-medium">{message}</p>
        )}
        {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
      </div>
    </div>
  );
};

export default DeleteAccount;
