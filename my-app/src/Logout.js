import React from 'react'
import axios from 'axios';
const Logout = () => {
    const logout = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/logout', { withCredentials: true });
         // setMessage(response.data.message);
        } catch (err) {
          console.log(err) // Redirect to login if not authenticated
        }
      };
      logout();
  return (
    <div>
      <h>Logged out successfully</h>
    </div>
  )
}

export default Logout;
