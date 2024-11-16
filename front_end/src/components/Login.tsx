import React, { useState } from 'react';
import '../styles/Login.css';

interface Credentials {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({ username: '', password: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endpoint = isRegistering ? '/api/register' : '/api/login';
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        if (!isRegistering) {
          console.log('Innlogget som:', data.user);
        }
      } else {
        setMessage(data.message || 'Noe gikk galt.');
      }
    } catch (error) {
      console.error('Feil under forespørselen:', error);
      setMessage('Serverfeil. Prøv igjen senere.');
    }
  };

  return (
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
  );
};

export default Login;
