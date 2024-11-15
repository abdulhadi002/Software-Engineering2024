import { LoginInformation } from "./src/components/Types";

const API_BASE_URL = 'http://localhost:6969';

export const fetchDevices = async () => {
  const response = await fetch(`${API_BASE_URL}/IotEnheter`);
  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }
  return response.json();
};

export const addDevice = async (deviceName: string) => {
  const username = localStorage.getItem('username');
  if (!username) {
    throw new Error('You must be logged in to add a device');
  }
  const response = await fetch(`${API_BASE_URL}/IotEnheter`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'username': username 
    },
    body: JSON.stringify({ device_name: deviceName }),
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
  const data = await response.json();
  localStorage.setItem('username', credentials.username);
  return data;
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
