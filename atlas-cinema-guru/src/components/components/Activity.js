import './components.css';
import React from 'react';

export default function Activity({}) {
  userName = 'testUser';
  showName = 'The Matrix';

  return (
    <li>
      <p>{userName} added {showName} to watch later - March 28, 2024</p>
    </li>
  );
}