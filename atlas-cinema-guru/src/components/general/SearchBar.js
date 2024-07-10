import React from 'react';
import './general.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function SearchBar({ title, setTitle }) {
  const handleInput = (e) => {
    setTitle(e.target.value);
  };

  return (
    <input
      type="text"
      value={title}
      placeholder={title ? title : "Search Movies"}
      className={"searchBar"}
      onChange={handleInput}
      icon={<FontAwesomeIcon icon={faSearch} style={{color: "#d3d6db",}} />}
    />
  );
}