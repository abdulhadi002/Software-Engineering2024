import React from 'react';
import { DeviceData } from './Types';
import '../styles/IoTenheter.css';

type IoTenheterProps = {
  devices: DeviceData[];
  onAddDevice: (newDevice: Omit<DeviceData, 'id'>) => void;
  onDeleteDevice: (deviceId: number) => void;
};

const IoTenheter: React.FC<IoTenheterProps> = ({ devices, onAddDevice, onDeleteDevice }) => {
  const [formData, setFormData] = React.useState<Omit<DeviceData, 'id'>>({
    device_name: '',
    device_status: false,
    device_version: '',
    device_description: '',
    device_image: '',
    user_id: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let newValue: string | boolean = value;
    if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddDevice(formData);
    setFormData({
      device_name: '',
      device_status: false,
      device_version: '',
      device_description: '',
      device_image: '',
      user_id: 1,
    });
  };

  return (
    <div className="iot-page">
      <div className="enhetsliste-container">
        <form onSubmit={handleSubmit} className="input-container">
          <input
            type="text"
            name="device_name"
            placeholder="Device Name"
            value={formData.device_name}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="device_version"
            placeholder="Device Version"
            value={formData.device_version}
            onChange={handleChange}
            className="input-field"
            required
          />
          <textarea
            name="device_description"
            placeholder="Device Description"
            value={formData.device_description}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="file"
            name="device_image"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFormData({
                  ...formData,
                  device_image: e.target.files[0].name,
                });
              }
            }}
            className="input-field"
            required
          />
          <div className="status-container">
            <label className="status-label">
              Status:
              <input
                type="checkbox"
                name="device_status"
                checked={formData.device_status}
                onChange={handleChange}
                className="status-checkbox"
              />
            </label>
          </div>
          <button type="submit" className="add-button">
            Legg til
          </button>
        </form>

        <div className="enhetsliste">
          {devices.length > 0 ? (
            devices.map((device) => (
              <div key={device.id} className="enhets-element">
                <div>
                  <h3>{device.device_name}</h3>
                  <p>Versjon: {device.device_version}</p>
                  <p>Beskrivelse: {device.device_description}</p>
                  <p>Status: {device.device_status ? 'Aktiv' : 'Inaktiv'}</p>
                  {device.device_image && (
                    <img
                      src={`/uploads/${device.device_image}`}
                      alt={device.device_name}
                      style={{ width: '100px', height: 'auto', marginTop: '10px' }}
                    />
                  )}
                </div>
                <button
                  onClick={() => onDeleteDevice(device.id)}
                  className="delete-button"
                >
                  Slett
                </button>
              </div>
            ))
          ) : (
            <p>No devices available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IoTenheter;
