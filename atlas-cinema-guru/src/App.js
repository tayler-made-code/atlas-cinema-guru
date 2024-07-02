import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken) {
      fetch('/api/auth/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        setIsLoggedIn(true);
        setUserUsername(data.username);
      })
      .catch(error => {
        console.error('Authentication error:', error);
        setIsLoggedIn(false);
      });
    }
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <Authentication />
      )}
    </div>
  );
}