// LoginPage.tsx

import React, { useState } from 'react';
import Login from '../components/Login';
import { LoginInformation } from '../components/Types';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState<LoginInformation>({ userName: '', password: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulere en innlogging eller registreringsprosess
    if (credentials.userName === 'test' && credentials.password === 'password') {
      setMessage('Innlogging vellykket');
      onLogin();
    } else {
      setMessage('Innlogging mislyktes. Sjekk brukernavn og passord.');
    }
  };

  return (
    <div>
      <Login
        credentials={credentials}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isRegistering={isRegistering}
        setIsRegistering={setIsRegistering}
        message={message}
      />
    </div>
  );
};

export default LoginPage;
