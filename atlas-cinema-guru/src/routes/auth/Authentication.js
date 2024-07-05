import './auth.css';
import React, { useState } from 'react';
import Button from '../../components/general/Button';
import Login from './Login';
import Register from './Register';
import axios from 'axios';

export default function Authentication({ setIsLoggedIn, setUserUsername }) {
  const [ _switch, setSwitch ] = useState(true);
  const [ userName, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (_switch) {
        response = await axios.post('/api/auth/login', { userName, password });
      } else {
        response = await axios.post('/api/auth/register', { userName, password });
      }

      const { token } = response.data;
      localStorage.setItem('accessToken', token);
      setUserUsername(userName);
      setIsLoggedIn(true);  
    } catch (error) {
      console.error('Authentication error:', error);
      setIsLoggedIn(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className = "auth-buttons">
        <Button
          label="Sign In"
          onClick={() => setSwitch(true)}
          className={_switch ? 'active' : ''}
        />
        <Button
          label="Sign Up"
          onClick={() => setSwitch(false)}
          className={!_switch ? 'active' : ''}
        />
      </div>
      {_switch ? (
        <Login
          username={userName}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <Register
          username={userName}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
    </form>
  );
}