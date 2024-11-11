import { useState, useEffect } from 'react';
import { fetchDevices, addDevice, deleteDevice } from '../../api';

const useDevices = () => {
  const [devices, setDevices] = useState<string[]>([]);
  const [newDevice, setNewDevice] = useState<string>("");

  useEffect(() => {
    const getDevices = async () => {
      try {
        const data = await fetchDevices();
        setDevices(data.map((device: any) => device.name));
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    getDevices();
  }, []);

  const handleAddDevice = async () => {
    if (newDevice.trim() !== "") {
      try {
        const data = await addDevice(newDevice);
        setDevices([...devices, data.name]);
        setNewDevice("");
      } catch (error) {
        console.error('Error adding device:', error);
      }
    }
  };

  const handleRemoveDevice = async (index: number) => {
    try {
      await deleteDevice(index);
      const updatedDevices = devices.filter((_, i) => i !== index);
      setDevices(updatedDevices);
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
