import React from 'react';
import './general.css';


export default function SearchBar({ title, setTitle }) {
  const handleInput = (e) => {
    setTitle(e.target.value);
  };

  return (
    <input
      type="text"
      value={title}
      onChange={handleInput}
    />
  );
}