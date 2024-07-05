import './auth.css';
import React from 'react';
import Button from '../../components/general/Button';
import Input from '../../components/general/Input';
import { faUser, faKey, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Register({ userName, password, setUsername, setPassword }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="register-form">
      <h1>Create a new account</h1>
      <Input
        label="Username"
        type="text"
        value={userName}
        setValue={setUsername}
        icon={<FontAwesomeIcon icon={faUser} style={{color: "#d3d6db",}} />}
        inputAttributes={{ size: 40 }}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        setValue={setPassword}
        icon={<FontAwesomeIcon icon={faKey} style={{color: "#d3d6db",}} />}
        inputAttributes={{ size: 40 }}
      />
      <Button
        label="Sign up"
        className="submit-button"
        onClick={handleSubmit}
        icon={<FontAwesomeIcon icon={faPlus} style={{color: "#d3d6db",}} />}
      />
    </div>
  );
}