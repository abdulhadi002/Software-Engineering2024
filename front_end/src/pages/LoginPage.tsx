import React from 'react';
import useLogin from '../hooks/useLogin';
import Login from '../components//Login';
import { LoginInformation } from '../components/Types';

interface LoginPageProps {
  checkUserCredentials: (credentials: LoginInformation) => Promise<boolean>;
  registerUser: (credentials: LoginInformation) => Promise<void>;
}

const LoginPage: React.FC<LoginPageProps> = ({ checkUserCredentials, registerUser }) => {
  const { credentials, handleChange, handleSubmit, isRegistering, setIsRegistering, message } = useLogin(checkUserCredentials, registerUser);

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
