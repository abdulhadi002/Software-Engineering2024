// pages/IotEnheterPage.tsx
import React from 'react';
import useDevices from '../../src/hooks/useDevices';
import IoTenheter from '../components/IoTenheter';
import { DeviceData } from '../components/Types';

const IotEnheterPage: React.FC = () => {
  const {
    devices,
    handleAddDevice,
    handleRemoveDevice,
    error,
    loading,
  } = useDevices();

  return (
    <div>
      {loading ? (
        <p>Loading devices...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <IoTenheter
          devices={devices}
          onAddDevice={handleAddDevice} // Pass directly
          onDeleteDevice={handleRemoveDevice}
        />
      )}
    </div>
  );
};

export default IotEnheterPage;
