const API_BASE_URL = 'http://localhost:6969';

export const fetchDevices = async () => {
  const response = await fetch(`${API_BASE_URL}/devices`);
  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }
  return response.json();
};

export const addDevice = async (deviceName: string) => {
  const response = await fetch(`${API_BASE_URL}/devices`, {
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
  await fetch(`${API_BASE_URL}/devices/${index}`, { method: 'DELETE' });
};
