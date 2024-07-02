import React from 'react';
import './general.css';


export default function Button({ label, className, onClick, icon }) {
  const onClick = () => {
    console.log('Button clicked');
  };

  return (
    <button className={`button ${className}`} onClick={onClick}>
      {icon && <img src={icon} alt="icon" />}
      {label}
    </button>
  );
}