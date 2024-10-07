import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';


const Profile = ({ isAuthenticated }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.get('http://localhost:5000/api/profile', { withCredentials: true });
          setUserData(response.data);
        } catch (err) {
          setError(err.response ? err.response.data.message : 'Something went wrong');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [isAuthenticated]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>My Profile</h2>
      {isAuthenticated ? (
        userData ? (
          <div>
            <p><strong>First Name:</strong> {userData.firstName}</p>
            <p><strong>Last Name:</strong> {userData.lastName}</p>
            {/* Add more user details here */}
          </div>
        ) : (
          <p className="message">User data not found.</p>
        )
      ) : (
        <p className="message" style={{color:'Maroon'}}>You are not logged in yet. Please log in to access this content.</p>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Profile;
