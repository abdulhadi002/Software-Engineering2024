import { useState } from 'react';
import { LoginInformation } from '../components/Types';

const useLogin = (
  checkUserCredentials: (credentials: LoginInformation) => Promise<boolean>,
  registerUser: (credentials: LoginInformation) => Promise<void>
) => {
  const [credentials, setCredentials] = useState<LoginInformation>({
    username: '',
    password: ''
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState<string | null>(
    localStorage.getItem('username')
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      try {
        await registerUser(credentials);
        setMessage('Bruker registrert! Vennligst logg inn.');
        setIsRegistering(false);
      } catch (error) {
        setMessage('Registrering feilet. Prøv igjen.');
      }
    } else {
      try {
        const isValidUser = await checkUserCredentials(credentials);
        if (isValidUser) {
          setMessage('Innlogging vellykket!');
          setLoggedInUser(credentials.username);
          localStorage.setItem('username', credentials.username);
        } else {
          setMessage('Ugyldig brukernavn eller passord.');
        }
      } catch (error) {
        setMessage('Innlogging feilet. Prøv igjen.');
      }
    }
  };

  const logout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('username');
    setMessage('Du har logget ut.');
  };

  return {
    credentials,
    handleChange,
    handleSubmit,
    isRegistering,
    setIsRegistering,
    message,
    loggedInUser,
    logout,
  };
};

export default useLogin;
