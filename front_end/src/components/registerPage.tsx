import React, { useState } from 'react';
import { registerUser } from '../services/authApi';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    await registerUser(username, password);
  };

  return (
    <div>
      <h2>Registrer deg</h2>
      <input
        type="text"
        placeholder="Brukernavn"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Passord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Registrer</button>
    </div>
  );
};

export default RegisterPage;
