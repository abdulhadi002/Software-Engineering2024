import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { LoginInformation } from './components/Types';

const App: React.FC = () => {
  // Funksjon for å sjekke brukerens innloggingsinformasjon
  const checkUserCredentials = async (credentials: LoginInformation): Promise<boolean> => {
    // Simulerer en autentisering
    return credentials.userName === 'admin' && credentials.password === 'admin';
  };

  // Funksjon for å registrere brukeren (for nå bare en placeholder)
  const registerUser = async (credentials: LoginInformation): Promise<void> => {
    // Simulerer registrering av ny bruker
    console.log('Registrerer ny bruker:', credentials);
  };

  return (
    <Router>
      <Routes>
        {/* LoginPage er nå den eneste ruten for testing */}
        <Route path="/" element={<LoginPage checkUserCredentials={checkUserCredentials} registerUser={registerUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
