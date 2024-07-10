import './dashboard.css';
import React from 'react';
import Header from '../../components/navigation/Header';
import SideBar from '../../components/navigation/SideBar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import Favorites from './Favorites';
import WatchLater from './WatchLater';

export default function Dashboard({ userUsername, setIsLoggedIn }) {
  return (
    <Router>
      <div className="dashboard">
        <Header 
          userUsername={userUsername}
          setIsLoggedIn={setIsLoggedIn}
        />
        <div className="dashboard-content">
          <SideBar />
          <main className="main-content">
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/watchlater" element={<WatchLater />} />
              <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}