import './auth.css';
import React, { useState } from 'react';
import Button from '../../components/general/Button';
import Login from './Login';
import Register from './Register';
import axios from 'axios';

export default function Authentication({ setIsLoggedIn, setUserUsername }) {
  const [ _switch, setSwitch ] = useState(true);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (_switch) {
        response = await axios.post('http://localhost:8000/api/auth/login', { username, password });
      } else {
        response = await axios.post('http://localhost:8000/api/auth/register', { username, password });
      }

      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      setUserUsername(username);
      setIsLoggedIn(true);  
    } catch (error) {
      console.error('Authentication error:', error);
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="auth-container">
      <div className = "auth-buttons">
        <Button
          label="Sign In"
          type="button"
          onClick={() => setSwitch(true)}
          className={_switch ? 'active' : ''}
        />
        <Button
          label="Sign Up"
          type="button"
          onClick={() => setSwitch(false)}
          className={!_switch ? 'active' : ''}
        />
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        {_switch ? (
          <Login
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        ) : (
          <Register
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        )}
      </form>
    </div>
  );
}