import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import Enhetsdetaljer from './components/Enhetsdetaljer';
import Layout from './components/Layout';
import IoTenheter from './components/IoTenheter';
import Profile from './components/Profile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />

        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Layout>
                <Profile />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/IotEnheter"
          element={
            isAuthenticated ? (
              <Layout>
                <IoTenheter />
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
                    device_name: '',
                    device_status: false,
                    device_version: '',
                    device_description: '',
                    device_image: ''
                  }}
                  onToggleStatus={function (): void {
                    throw new Error('Function not implemented.');
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
