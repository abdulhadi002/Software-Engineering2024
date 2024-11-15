// Example structure of useDevices hook
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DeviceData } from '../components/Types';

const useDevices = () => {
  const [devices, setDevices] = useState<DeviceData[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get('/IotEnheter');
        setDevices(response.data || []); // Set devices to an empty array if response.data is undefined
      } catch (err) {
        setError('Failed to fetch devices');
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handleRemoveDevice = async (index: number) => {
    const deviceId = devices[index]?.id; // Get the device ID from the devices array
    if (deviceId) {
      try {
        await axios.delete(`/IotEnheter/${deviceId}`);
        setDevices(devices.filter((_, i) => i !== index));
      } catch (err) {
        setError('Failed to remove device');
      }
    }
  };

  return { devices, handleRemoveDevice, loading, error };
};

export default useDevices;
