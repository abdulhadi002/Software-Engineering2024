import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { LoginInformation } from './components/Types';
import Footer from './components/Footer'; 
import Nav from './components/Nav'; 
import Layout from './components/Layout';
import IoTenheter from './components/IoTenheter';

const App: React.FC = () => {
  const checkUserCredentials = async (credentials: LoginInformation): Promise<boolean> => {
    return credentials.userName === 'admin' && credentials.password === 'admin';
  };

  const registerUser = async (credentials: LoginInformation): Promise<void> => {
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
