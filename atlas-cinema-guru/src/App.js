import React, { useState, useEffect } from 'react';
import './App.css';
import Authentication from './routes/auth/Authentication';
import Dashboard from './routes/dashboard/Dashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken) {
      fetch('http://localhost:8000/api/auth', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Authentication failed');
        }
        return response.json();
      })
      .then(data => {
        setIsLoggedIn(true);
        setUserUsername(data.username);
      })
      .catch(error => {
        console.error('Authentication error:', error);
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
      });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="App">
      
      {isLoggedIn ? (
        <Dashboard userUsername={userUsername} setIsLoggedIn={setIsLoggedIn}/>
      ) : (
        <Authentication setIsLoggedIn={setIsLoggedIn} setUserUsername={setUserUsername} />
      )}
    </div>
  );
}