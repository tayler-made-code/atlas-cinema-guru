import './dashboard.css';
import React from 'react';
import Header from '../../components/navigation/Header';
import SideBar from '../../components/navigation/SideBar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';

export default function Dashboard({ userUsername, setIsLoggedIn }) {
  return (
    <Router>
      <div className="dashboard">
        <Header 
          userUsername={userUsername}
          setIsLoggedIn={setIsLoggedIn}
        />
        <SideBar />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watchlater" element={<WatchLater />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
}