import React, { useState } from 'react';
import './App.css';
import { App_list } from './Product';
import Login from './Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login logic, set isLoggedIn to true upon successful login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic, set isLoggedIn to false upon logout
    setIsLoggedIn(false);
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <App_list onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
