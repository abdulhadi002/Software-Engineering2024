import { useState } from 'react';
import { LoginInformation } from '../components/Types';

const useLogin = (checkUserCredentials: (credentials: LoginInformation) => Promise<boolean>, registerUser: (credentials: LoginInformation) => Promise<void>) => {
  const [credentials, setCredentials] = useState<LoginInformation>({
    userName: '',
    password: ''
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');

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
        setIsRegistering(false); // Bytt til login etter vellykket registrering
      } catch (error) {
        setMessage('Registrering feilet. Prøv igjen.');
      }
    } else {
      try {
        const isValidUser = await checkUserCredentials(credentials);
        if (isValidUser) {
          setMessage('Innlogging vellykket!');
        } else {
          setMessage('Ugyldig brukernavn eller passord.');
        }
      } catch (error) {
        setMessage('Innlogging feilet. Prøv igjen.');
      }
    }
  };

  return {
    credentials,
    handleChange,
    handleSubmit,
    isRegistering,
    setIsRegistering,
    message,
  };
};

export default useLogin;
