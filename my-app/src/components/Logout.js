import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Logout = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      if (isAuthenticated) {
        try {
          await axios.get('http://localhost:5000/api/logout', { withCredentials: true });
          onLogout();
          navigate('/login');
        } catch (err) {
          console.error(err);
        }
      }
    };
    logout();
  }, [isAuthenticated, navigate, onLogout]);

  return (
    <div className="container">
      {isAuthenticated ? <h2>Logged out successfully</h2> : <p className="message"style={{color:"Maroon"}}>You are not logged in yet.</p>}
    </div>
  );
};

export default Logout;
