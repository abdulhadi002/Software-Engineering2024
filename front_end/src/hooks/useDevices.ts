import { useState, useEffect } from 'react';
import { fetchDevices, addDevice as addDeviceApi, deleteDevice as deleteDeviceApi } from '../../api';

const useDevices = () => {
  const [devices, setDevices] = useState<string[]>([]);
  const [newDevice, setNewDevice] = useState<string>("");

  useEffect(() => {
    const getDevices = async () => {
      try {
        const data = await fetchDevices();
        if (Array.isArray(data)) {
          setDevices(data.map((device: any) => device.name));
        } else {
          console.error('Expected an array but got:', data);
        }
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    getDevices();
  }, []);

  const handleAddDevice = async () => {
    if (newDevice.trim() !== "") {
      try {
        const data = await addDeviceApi(newDevice);
        setDevices((prevDevices) => [...prevDevices, data.name]);
        setNewDevice("");
      } catch (error) {
        console.error('Error adding device:', error);
      }
    }
  };

  const handleRemoveDevice = async (index: number) => {
    try {
      await deleteDeviceApi(index);
      setDevices((prevDevices) => prevDevices.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };

  return {
    devices,
    newDevice,
    setNewDevice,
    handleAddDevice,
    handleRemoveDevice,
  };
};

export default useDevices;
