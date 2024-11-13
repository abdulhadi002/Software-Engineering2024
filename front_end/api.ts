import { LoginInformation } from "./src/components/Types";

const API_BASE_URL = 'http://localhost:6969/api';

export const fetchDevices = async () => {
  const response = await fetch(`${API_BASE_URL}/IotEnheter`);
  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }
  return response.json();
};

export const addDevice = async (deviceName: string) => {
  const response = await fetch(`${API_BASE_URL}/IotEnheter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: deviceName }),
  });
  if (!response.ok) {
    throw new Error('Error adding device');
  }
  return response.json();
};

export const deleteDevice = async (index: number) => {
  await fetch(`${API_BASE_URL}/IotEnheter/${index}`, { method: 'DELETE' });
};

export const login = async (credentials: LoginInformation) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    throw new Error('Login failed. Check your credentials.');
  }
  return response.json();
};

export const register = async (credentials: LoginInformation) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    throw new Error('Registration failed. Username may be taken.');
  }
  return response.json();
};
