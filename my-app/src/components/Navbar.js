import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  return (
    <nav className="nav">
      <Link to="/register" className="navLink">Register</Link>
      <Link to="/login" className="navLink">Login</Link>
      <Link to="/profile" className="navLink">My Profile</Link>
      <Link to="/logout" className="navLink">Logout</Link>
    </nav>
  );
};

export default Navbar;
