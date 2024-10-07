import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        firstName,
        lastName,
        email,
        mobile,
        dob,
        gender,
        password,
        confirmPassword
      }, {
        withCredentials: true  // Add this line to send cookies
      });
      console.log(response.data);  // Handle successful registration
      navigate('/login');  // Redirect to login after registration
    } catch (err) {
        if (err.response) {
            console.log('Error Response Data:', err.response.data);
            console.log('Error Status:', err.response.status);
            console.log('Error Headers:', err.response.headers);
        } else if (err.request) {
            console.log('Error Request:', err.request);
        } else {
            console.log('Error Message:', err.message);
        }
        setError(err.response ? err.response.data.message : 'Registration failed');
    }
};

  

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="formGroup">
          <label className="label">First Name:</label>
          <input
            type="text"
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label className="label">Last Name:</label>
          <input
            type="text"
            className="input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label className="label">Email:</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label className="label">Mobile:</label>
          <input
            type="text"
            className="input"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label className="label">Date of Birth:</label>
          <input
            type="date"
            className="input"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label className="label">Gender:</label>
          <select
            className="input"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="formGroup">
          <label className="label">Password:</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label className="label">Confirm Password:</label>
          <input
            type="password"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Register;
