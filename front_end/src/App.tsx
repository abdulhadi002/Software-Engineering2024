import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { LoginInformation } from './components/Types';
import Footer from './components/Footer'; // Importing the Footer component
import Nav from './components/Nav'; // Importing the Nav component
import Layout from './components/Layout';
import IoTenheter from './components/IoTenheter';

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
        <Layout>
          <Routes>
          {/* LoginPage er nå den eneste ruten for testing */}
          <Route path="/" element={<LoginPage checkUserCredentials={checkUserCredentials} registerUser={registerUser} />} />
          <Route path="/hovedmeny" element={<IoTenheter/>}/>
      </Routes>
        </Layout>
    </Router>
  );
};

export default App;
