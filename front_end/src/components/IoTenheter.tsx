import React from 'react';
import useDevices from '../hooks/useDevices';
import '../styles/iotenheter.css';

const IoTenheter: React.FC = () => {
  const { devices, newDevice, setNewDevice, handleAddDevice, handleRemoveDevice } = useDevices();

  return (
    <div className="enhetsliste">
      <h2>Enhetsliste</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Legg til ny enhet"
          value={newDevice}
          onChange={(e) => setNewDevice(e.target.value)}
          className="input-field"
        />
        <button onClick={handleAddDevice} className="add-button">Legg til</button>
      </div>

      {devices.length > 0 ? (
        devices.map((device, index) => (
          <div key={index} className="enhets-element">
            <span>{device}</span>
            <button onClick={() => handleRemoveDevice(index)} className="delete-button">Slett</button>
          </div>
        ))
      ) : (
        <p>Ingen enheter lagt til ennå.</p>
      )}
    </div>
  );
};

export default IoTenheter;
