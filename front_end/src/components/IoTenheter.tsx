import React from 'react';
import { DeviceData } from './Types';

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
    <div className="enhetsliste">
      <h2>Enhetsliste</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="device_name"
          placeholder="Device Name"
          value={formData.device_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="device_version"
          placeholder="Device Version"
          value={formData.device_version}
          onChange={handleChange}
          required
        />
        <textarea
          name="device_description"
          placeholder="Device Description"
          value={formData.device_description}
          onChange={handleChange}
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
          required
        />
        <label>
          Status:
          <input
            type="checkbox"
            name="device_status"
            checked={formData.device_status}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Legg til</button>
      </form>
      {devices && devices.length > 0 ? (
        devices.map((device) => (
          <div key={device.id}>
            <span>{device.device_name}</span>
            <button onClick={() => onDeleteDevice(device.id)}>Slett</button>
          </div>
        ))
      ) : (
        <p>No devices available.</p>
      )}
    </div>
  );
};

export default IoTenheter;
