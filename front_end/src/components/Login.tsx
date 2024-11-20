import React from 'react';
import '../styles/Login.css';
import { LoginProps } from './Types';

const Login: React.FC<LoginProps> = ({
  credentials,
  handleChange,
  handleSubmit,
  isRegistering,
  setIsRegistering,
  message,
}) => {
  return (
    <div className="login-page">
      <div className="login-section">
        <h2 id="h2-login">{isRegistering ? 'Registrer' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="username">Brukernavn</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="password">Passord</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="button-container">
            <button type="submit" className="register-button">
              {isRegistering ? 'Registrer' : 'Logg inn'}
            </button>
          </div>
        </form>

        <div className="toggle-container">
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering
              ? 'Allerede registrert? Logg inn her'
              : 'Ny bruker? Registrer deg her'}
          </button>
        </div>

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default Login;
