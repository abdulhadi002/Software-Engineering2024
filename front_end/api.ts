import {UserWithoutPassword } from "../back_end/src/models/User";
import { DeviceData, LoginInformation } from "./src/components/Types";

const API_BASE_URL = 'http://localhost:6969';

export const fetchDevices = async (): Promise<DeviceData[]> => {
  const response = await fetch(`${API_BASE_URL}/IotEnheter`, {
    method: 'GET',
    credentials: 'include', // Include cookies
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }
  return response.json();
};

export const addDevice = async (device: Omit<DeviceData, 'id'>): Promise<DeviceData> => {
  const response = await fetch(`${API_BASE_URL}/IotEnheter`, {
    method: 'POST',
    credentials: 'include', // Include cookies
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(device),
  });
  if (!response.ok) {
    throw new Error('Error adding device');
  }
  return response.json();
};

export const deleteDevice = async (deviceId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/IotEnheter/${deviceId}`, { 
    method: 'DELETE',
    credentials: 'include', // Include cookies
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Error deleting device: ${response.status}`);
  }
};

export const login = async (credentials: LoginInformation): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    credentials: 'include', // Include cookies
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Login failed. Check your credentials.');
  }
  const data = await response.json();
  // No need to store username in localStorage as authentication is via cookies
  return data;
};

export const register = async (credentials: LoginInformation): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    credentials: 'include', // Include cookies
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Registration failed. Username may be taken.');
  }
  const data = await response.json();
  // No need to store username in localStorage as authentication is via cookies
  return data;
};

// Optional: Fetch current user info
export const getCurrentUser = async (): Promise<UserWithoutPassword> => {
  const response = await fetch(`${API_BASE_URL}/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch current user');
  }
  return response.json();
};