import React from 'react';
import './general.css';

export default function Button({ label, className, onClick, icon }) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {icon}
      {label}
    </button>
  );
}