import './movies.css'
import React, { useState } from 'react'

export default function Tag({ genre, filter, genres, setGenres }) {
  const [selected, setSelected] = useState(false);

  const handleTag = () => {
    if (selected) {
      setGenres(prevGenres => prevGenres.filter(g => g !== genre));
      setSelected(false);
    } else {
      setGenres(prevGenres => [...prevGenres, genre]);
      setSelected(true);
    }
  };

  return (
    <li onClick={handleTag} className={`tag ${selected ? 'selected' : ''}`}>
      {genre}
    </li>
  );
}