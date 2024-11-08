import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Enhetsdetaljer from '../components/Enhetsdetaljer';
import { DeviceData } from '../components/Types.tsx';

const EnhetsdetaljerPage = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const [deviceData, setDeviceData] = useState<DeviceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const response = await fetch('/path/to/device-data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch device data');
        }
        const data = await response.json();
        const foundDevice = data.device_data.find((device: DeviceData) => device.device_name === deviceId);
        if (foundDevice) {
          setDeviceData(foundDevice);
        } else {
          throw new Error('Device not found');
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeviceData();
  }, [deviceId]);

  const handleToggleStatus = () => {
    if (deviceData) {
      setDeviceData({
        ...deviceData,
        device_status: !deviceData.device_status,
      });
    }
  };

  if (isLoading) {
    return <p>Laster enhetsdetaljer...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {deviceData ? (
        <Enhetsdetaljer deviceData={deviceData} onToggleStatus={handleToggleStatus} />
      ) : (
        <p>Ingen enhetsdata funnet.</p>
      )}
    </div>
  );
};

export default EnhetsdetaljerPage;
