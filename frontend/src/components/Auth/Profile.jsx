import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { email, name } = user; 
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">Profile</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-semibold text-gray-800">{name || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-semibold text-gray-800">{email}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
