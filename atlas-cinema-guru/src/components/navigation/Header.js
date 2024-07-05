import './navigation.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function Header({ userUsername, setIsLoggedIn }) {
  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  return (
    <nav>
      <img src="https://picsum.photos/100/100" alt="avatar"></img>
      <p>Welcome, {userUsername}!</p>
      <span className="sign-out-icon" onClick={logout}>
        <FontAwesomeIcon icon={faSignOutAlt} style={{color: "#E31C25",}} />
        <p>Logout</p>
      </span>
    </nav>
  );
}