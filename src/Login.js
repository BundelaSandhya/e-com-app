import React, { useState } from 'react';
import './Login.css'; // Import your CSS file for styling

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted:', { username, password });

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 30,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const auth_response = await response.json();
      const token = auth_response.token;
      console.log(token);

      // Invoke the onLogin callback passed from App.js
      if (typeof onLogin === 'function') {
        onLogin();
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Shopping App</h2>
      <h3>Your Personalized Shopping Destination</h3>
      <div className="login-box">
        <h2>Login Here</h2>
        <form onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
      <footer>
        <p>© 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Login;
