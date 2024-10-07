import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Protected = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/protected', { withCredentials: true });
        setMessage(response.data.message);
      } catch (err) {
        navigate('/login');  // Redirect to login if not authenticated
      }
    };

    fetchProtectedData();
  }, [navigate]);

  return (
    <div>
      <h2>Protected Route</h2>
      <p>{message ? message : 'Loading...'}</p>
    </div>
  );
};

export default Protected;
