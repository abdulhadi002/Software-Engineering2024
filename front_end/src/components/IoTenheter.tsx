import React, { useState } from 'react';
import useDevices from '../hooks/useDevices';
import axios from 'axios';
import '../styles/iotenheter.css';
import { DeviceData } from './Types';

const IoTenheter: React.FC = () => {
  const { devices, handleRemoveDevice } = useDevices();
  const [formData, setFormData] = useState<DeviceData>({
    device_name: '',
    device_status: false,
    device_version: '',
    device_description: '',
    device_image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        device_image: file.name
      }));
    }
  };

  const handleAddDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/devices', formData);
      console.log('Device added:', response.data);
    } catch (err) {
      setError('Error adding device');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enhetsliste">
      <h2>Enhetsliste</h2>
      <div className="input-container">
        <input
          type="text"
          name="device_name"
          placeholder="Device Name"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="checkbox"
          name="device_status"
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              device_status: e.target.checked
            }))
          }
          className="input-checkbox"
        />
        <label>Status</label>
        <input
          type="text"
          name="device_version"
          placeholder="Device Version"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="device_description"
          placeholder="Device Description"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="file"
          name="device_image"
          onChange={handleImageChange}
          required
          className="input-field"
        />
        <button onClick={handleAddDevice} className="add-button" disabled={loading}>
          Legg til
        </button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>

      {devices.length > 0 ? (
        devices.map((device, index) => (
          <div key={index} className="enhets-element">
            <span>{device.length}</span>
            <button onClick={() => handleRemoveDevice(index)} className="delete-button">
              Slett
            </button>
          </div>
        ))
      ) : (
        <p>Ingen enheter lagt til ennå.</p>
      )}
    </div>
  );
};

export default IoTenheter;