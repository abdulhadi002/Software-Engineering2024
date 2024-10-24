import React from 'react';
import '../styles/Login.css';
import { LoginInformation } from './Types';

interface LoginProps {
  credentials: LoginInformation;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isRegistering: boolean;
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}

const Login: React.FC<LoginProps> = ({ credentials, handleChange, handleSubmit, isRegistering, setIsRegistering, message }) => {
  return (
   

      <div className="login-section">
        <h2 id='h2-login'>{isRegistering ? 'Registrer' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="userName">Brukernavn</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={credentials.userName}
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

          <div className="forgot-password">
            <a href="#">Glemt passord?</a>
          </div>

          <div className="button-container">
            <button type="submit" className="register-button">
              {isRegistering ? 'Registrer' : 'Logg inn'}
            </button>
          </div>
        </form>

        <div className="toggle-container">
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Allerede registrert? Logg inn her' : 'Ny bruker? Registrer deg her'}
          </button>
        </div>

        {message && <div className="message">{message}</div>}
      </div>
    
  );
};

export default Login;