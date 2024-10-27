import React, { useState } from 'react';
import Login from '../components/Login';
import { LoginInformation } from '../components/Types';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  onLogin: () => void;
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
    const url = isRegistering ? 'http://localhost:6969/register' : 'http://localhost:6969/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        if (isRegistering) {
          setMessage('Bruker registrert! Du kan nå logge inn.');
          setIsRegistering(false);
        } else {
          onLogin();
          navigate('/hovedmeny');
        }
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Noe gikk galt');
      }
    } catch (error) {
      setMessage('Noe gikk galt. Vennligst prøv igjen.');
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
