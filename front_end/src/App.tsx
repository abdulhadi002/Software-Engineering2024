// App.tsx

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import Hovedmeny from './components/Hovedmeny';
import Enhetsdetaljer from './components/Enhetsdetaljer';
import Layout from './components/Layout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Funksjon for å oppdatere autentiseringstilstand etter login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* LoginPage som håndterer både login og registrering */}
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />

        {/* Protected Routes */}
        <Route
          path="/hovedmeny"
          element={
            isAuthenticated ? (
              <Layout>
                <Hovedmeny onLogout={handleLogout} />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/enhetsdetaljer/:deviceId"
          element={
            isAuthenticated ? (
              <Layout>
                <Enhetsdetaljer deviceData={{
                  device_name: '',
                  device_status: false,
                  device_version: '',
                  device_description: '',
                  device_image: ''
                }} onToggleStatus={function (): void {
                  throw new Error('Function not implemented.');
                } } />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
