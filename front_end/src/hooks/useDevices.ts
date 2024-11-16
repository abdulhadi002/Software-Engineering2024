import { useState, useEffect } from 'react';
import { fetchDevices, addDevice as addDeviceApi, deleteDevice as deleteDeviceApi } from '../../api';
import { DeviceData } from '../components/Types';

const useDevices = () => {
  const [devices, setDevices] = useState<DeviceData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getDevices = async () => {
      try {
        const data = await fetchDevices();
        setDevices(data || []);
      } catch (error) {
        setError('Failed to load devices');
        setDevices([]);
      } finally {
        setLoading(false);
      }
    };

    getDevices();
  }, []);

  const handleAddDevice = async (deviceData: Omit<DeviceData, 'id'>) => {
    try {
      const data = await addDeviceApi(deviceData);
      setDevices((prevDevices) => [...prevDevices, data]);
    } catch (error) {
      setError('Failed to add device');
    }
  };

  const handleRemoveDevice = async (deviceId: number) => {
    try {
      await deleteDeviceApi(deviceId);
      setDevices((prevDevices) => prevDevices.filter((device) => device.id !== deviceId));
    } catch (error) {
      setError('Failed to delete device');
    }
  };

  return {
    devices,
    handleAddDevice,
    handleRemoveDevice,
    error,
    loading,
  };
};

export default useDevices;
