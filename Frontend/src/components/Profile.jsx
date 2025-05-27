import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
      } else {
        alert('Unauthorized');
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Your Profile</h2>

        {user ? (
          <div className="space-y-4 text-gray-800">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-lg font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium">{user.email}</p>
            </div><div>
              <p className="text-sm text-gray-500">User-id</p>
              <p className="text-lg font-medium">{user.serialNumber}</p>
            </div>
            {/* Add more fields like gender, phone, etc., if needed */}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
