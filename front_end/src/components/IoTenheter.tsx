import React, { useState } from 'react';
import useDevices from '../hooks/useDevices';
import axios from 'axios';
import '../styles/iotenheter.css';

const IoTenheter: React.FC = () => {
  const { devices, handleRemoveDevice } = useDevices();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    user_id: '',
    purchased_at: '',
    status: '',
    device_description: '',
    device_version: '',
    device_image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
          name="name"
          placeholder="Device Name"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="type"
          placeholder="Device Type"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="user_id"
          placeholder="User ID"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="purchased_at"
          placeholder="Purchased At"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="device_description"
          placeholder="Description"
          onChange={handleChange}
          required
          className="input-field"
        />
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
          name="device_image"
          placeholder="Device Image URL"
          onChange={handleChange}
          required
          className="input-field"
        />
        <button onClick={handleAddDevice} className="add-button" disabled={loading}>Legg til</button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
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
