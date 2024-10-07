import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Logout from './components/Logout';

import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLoginSuccess = (data) => {
    setIsAuthenticated(true);
    setUserData(data);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
  };

  return (
    <Router>
      <div id="root">
        {/* Navbar */}
        <nav className="nav">
          {!isAuthenticated ? (
            <>
              <Link to="/register" className="navLink">Register</Link>
              <Link to="/login" className="navLink">Login</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="navLink">My Profile</Link>
              <Link to="/logout" className="navLink">Logout</Link>
            </>
          )}
        </nav>

        {/* Main Content */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route
            path="/logout"
            element={isAuthenticated ? <Logout onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile userData={userData} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
