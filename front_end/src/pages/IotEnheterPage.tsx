import React from 'react';
import useDevices from '../../src/hooks/useDevices';
import IoTenheter from '../components/IoTenheter';

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
          devices={devices || []}
          onAddDevice={handleAddDevice}
          onDeleteDevice={handleRemoveDevice}
        />
      )}
    </div>
  );
};

export default IotEnheterPage;
