import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
  // Replace with valid test password
    console.log('Logging in with:', { email, password }); // Log the email and password

    try {
        console.log('Attempting login...'); // Indicate that login attempt has started
        const response = await axios.post(
            'http://localhost:5000/api/login',
            { email, password},
            { withCredentials: true } // Ensure cookies are sent with the request
        );
        
        console.log("Login successful:", response.data); // Log response on successful login

        if (response.data.token) {
            navigate('/protected'); // Redirect to protected page after login
        }
    } catch (err) {
        console.error("Error during login:", err); // Log the error
        setError(err.response ? err.response.data.message : 'Something went wrong');
    }
};

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
