import './navigation.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'

export default function Header({ userUsername, setIsLoggedIn }) {
  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  return (
    <nav className="top-header">
      <Link to ="/home">
        <div className="title-div">
          <p className="title">Cinema Guru</p>
        </div>
      </Link>
      <div className="user-logout">
        <img src="https://picsum.photos/100/100" alt="avatar"></img>
        <p>Welcome, {userUsername}!</p>
        <span className="sign-out-icon" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} style={{color: "#E31C25",}} />
          <p>Logout</p>
        </span>
      </div>
    </nav>
  );
}