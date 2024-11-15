import React, { useState } from 'react';
import Login from '../components/Login';
import { LoginInformation } from '../components/Types';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../../api';

interface LoginPageProps {
  onLogin: (userData: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState<LoginInformation>({
    username: '',
    password: '',
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isRegistering) {
        await register(credentials);
        setMessage('Bruker registrert! Du kan nå logge inn.');
        setIsRegistering(false);
      } else {
        const userData = await login(credentials);
        localStorage.setItem('username', credentials.username);
        onLogin(userData);
        navigate('/IotEnheter');
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Noe gikk galt. Prøv igjen.');
    }
  };

  return (
    <Login
      credentials={credentials}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isRegistering={isRegistering}
      setIsRegistering={setIsRegistering}
      message={message}
    />
  );
};

export default LoginPage;
