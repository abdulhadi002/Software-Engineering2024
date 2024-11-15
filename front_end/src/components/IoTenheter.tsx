import React, { useState } from 'react';
import useDevices from '../hooks/useDevices';
import axios from 'axios';
import '../styles/iotenheter.css';
import { DeviceData } from './Types';

const IoTenheter: React.FC = () => {
  const { devices = [], handleRemoveDevice, loading, error } = useDevices(); // Default to an empty array
  const [formData, setFormData] = useState<DeviceData>({
    device_name: '',
    device_status: false,
    device_version: '',
    device_description: '',
    device_image: ''
  });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

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
    setAdding(true);
    setAddError(null);
    try {
      const response = await axios.post('/IotEnheter', formData);
      console.log('Device added:', response.data);
      setFormData({
        device_name: '',
        device_status: false,
        device_version: '',
        device_description: '',
        device_image: ''
      });
    } catch (err) {
      setAddError('Error adding device');
    } finally {
      setAdding(false);
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
          value={formData.device_name}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="checkbox"
          name="device_status"
          checked={formData.device_status}
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
          value={formData.device_version}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="device_description"
          placeholder="Device Description"
          value={formData.device_description}
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
        <button onClick={handleAddDevice} className="add-button" disabled={adding}>
          Legg til
        </button>
        {adding && <p>Adding...</p>}
        {addError && <p>{addError}</p>}
      </div>

      {loading ? (
        <p>Loading devices...</p>
      ) : error ? (
        <p>{error}</p>
      ) : devices.length > 0 ? (
        devices.map((device, index) => (
          <div key={device.id || index} className="enhets-element">
            <span>{device.device_name}</span>
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