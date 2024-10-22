import { DeviceData } from './types';

type EnhetsdetaljerProps = {
  deviceData: DeviceData;
  onToggleStatus: () => void;
};

export default function Enhetsdetaljer({ deviceData, onToggleStatus }: EnhetsdetaljerProps) {
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
