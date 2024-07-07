import './auth.css';
import React from 'react';
import Button from '../../components/general/Button';
import Input from '../../components/general/Input';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Login({ userName, password, setUsername, setPassword }) {
  return (
    <div className="login-form">
      <h1>Sign in with your account</h1>
      <Input
        label="Username:"
        type="text"
        className="username-input"
        value={userName}
        setValue={setUsername}
        icon={<FontAwesomeIcon icon={faUser} style={{color: "#d3d6db",}} />}
        inputAttributes={{ size: 40 }}
      />
      <Input
        label="Password:"
        type="password"
        className="password-input"
        value={password}
        setValue={setPassword}
        icon={<FontAwesomeIcon icon={faKey} style={{color: "#d3d6db",}} />}
        inputAttributes={{ size: 40 }}
      />
      <Button
        label="Submit"
        className="submit-button"
        icon={<FontAwesomeIcon icon={faKey} style={{color: "#d3d6db",}} />}
      />
    </div>
  );
}