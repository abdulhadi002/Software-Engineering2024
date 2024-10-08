import React, { useEffect, useState } from 'react';

type EnhetsdetaljerProps = {
  deviceId: string;
  onToggleStatus: () => void;
};

type DeviceData = {
  device_name: string;
  device_status: boolean;
  device_version: string;
  device_description: string;
  device_image: string;
};

export default function Enhetsdetaljer({ deviceId, onToggleStatus }: EnhetsdetaljerProps) {
  const [deviceData, setDeviceData] = useState<DeviceData | null>(null);

  useEffect(() => {
    fetch('/path/to/device-data.json')
      .then((response) => response.json())
      .then((data) => {
        const foundDevice = data.device_data.find((device: DeviceData) => device.device_name === deviceId);
        setDeviceData(foundDevice);
      })
      .catch((error) => {
        console.error('Error fetching device data:', error);
      });
  }, [deviceId]);

  if (!deviceData) {
    return <p>Loading device details...</p>;
  }

  return (
    <main className="device-details-container" aria-labelledby="device-details-title">
      <header className="device-header">
        <h1 id="device-details-title">BLUE-BOOTH</h1>
      </header>

      <section className="device-details">
        <header>
          <h2>Enhets-detaljer:</h2>
        </header>

        <section>
          <h3>Enhetsnavn</h3>
          <p>{deviceData.device_name}</p>
        </section>

        <section>
          <h3>Enhets-status</h3>
          <p>{deviceData.device_status ? 'På' : 'Av'}</p>
        </section>

        <section>
          <h3>Enhetsversjon</h3>
          <p>{deviceData.device_version}</p>
        </section>

        <section>
          <h3>Enhetsbeskrivelse</h3>
          <p>{deviceData.device_description}</p>
        </section>

        <figure>
          <img src={deviceData.device_image} alt={`${deviceData.device_name} enhetsbilde`} />
          <figcaption>{deviceData.device_description}</figcaption>
        </figure>

        <footer>
          <button onClick={onToggleStatus}>
            {deviceData.device_status ? 'Slå av' : 'Slå på'}
          </button>
        </footer>
      </section>
    </main>
  );
}