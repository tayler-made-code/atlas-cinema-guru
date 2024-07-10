import React from 'react';
import './general.css';

export default function Input({ label, type, className, value, setValue, icon, inputAttributes }) {
  const handleInput = (e) => {
    const newValue = e.target.value;
    if (type === 'number') {
      const numberValue = parseInt(newValue, 10);
      if (!isNaN(numberValue)) {
        setValue(numberValue);
      }
    } else {
      setValue(newValue);
    }
  };

  return (
    <div className="input-container">
      <label>{label}</label>
      <div className="input-wrapper">
        {icon}
        <input
          type={type}
          className={`input ${className}`}
          value={value}
          onChange={handleInput}
          {...inputAttributes}
        />
      </div>
    </div>
  );
}