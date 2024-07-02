import React from 'react';
import './general.css';


export default function SelectInput({ label, options, className, value, setValue }) {
  const handleSelect = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="input-container">
      <label>{label}</label>
      <div className="input-wrapper">
        <select
          className={`select-input ${className}`}
          value={value}
          onChange={handleSelect}
        >
          <option value="">Select an Option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}