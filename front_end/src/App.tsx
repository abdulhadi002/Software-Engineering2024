import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import Enhetsdetaljer from './components/Enhetsdetaljer';
import Layout from './components/Layout';
import IoTenheter from './components/IoTenheter';
import Profile from './components/Profile'; // Importer Profile-komponenten
import IotEnheterPage from './pages/IotEnheterPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    membership: '',
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
    if (isAuthenticated) {

      const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:6969/profile', {
            headers: {
              'x-username': localStorage.getItem('username') || '',
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserData({
              username: data.username || 'Ukjent bruker',
              password: data.password || '********',
              membership: data.membership || 'Gratis',
            });
          } else {
            console.error('Feil ved henting av brukerdata:', response.statusText);
          }
        } catch (error) {
          console.error('Nettverksfeil:', error);
        }
      };

      fetchUserData();
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route 
          path="/profile" 
          element={
            <Profile 
              username={userData.username} 
              password={userData.password} 
              membership={userData.membership} 
            />
          } 
        />
        <Route
          path="/IotEnheter"
          element={
            isAuthenticated ? (
              <Layout>
               <IotEnheterPage />
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
        <Enhetsdetaljer/>
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
                <Enhetsdetaljer 
                  deviceData={{
                    id: '', 
                    user_id: 1, 
                    device_name: '',
                    device_status: false,
                    device_version: '',
                    device_description: '',
                    device_image: ''
                  }} 
                  onToggleStatus={() => {
                
                  }} 
                />
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
