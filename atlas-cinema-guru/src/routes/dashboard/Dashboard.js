import './dashboard.css';
import React from 'react';
import Header from '../../components/navigation/Header';

export default function Dashboard({ userUsername, setIsLoggedIn }) {
  return (
    <div className="dashboard">
      <Header 
        userUsername={userUsername}
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
}