import React, { useState, useEffect } from 'react';
import '../styles/iotenheter.css';

const IoTenheter: React.FC = () => {
    // State for å holde på listen over IoT-enheter
    const [devices, setDevices] = useState<string[]>([]);
    const [newDevice, setNewDevice] = useState<string>("");

    // Hente enheter fra backend når komponenten laster
    useEffect(() => {
      fetch('http://localhost:3000/devices')
          .then(response => {
              if (!response.ok) {
                  throw new Error(`Server error: ${response.status}`);
              }
              return response.json();
          })
          .then(data => setDevices(data.map((device: any) => device.name)))
          .catch(error => console.error('Error fetching devices:', error));
  }, []);
  
  

    // Funksjon for å legge til en ny IoT-enhet
    const addDevice = () => {
      if (newDevice.trim() !== "") {
          fetch('http://localhost:3000/devices', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name: newDevice }),
          })
              .then(response => response.json())
              .then(data => {
                  setDevices([...devices, data.name]); // Oppdatere listen med ny enhet
                  setNewDevice(""); // Resetter inputfeltet
              })
              .catch(error => console.error('Error adding device:', error));
      }
  };
  

    // Funksjon for å slette en spesifikk enhet
    const removeDevice = (index: number) => {
        fetch(`http://localhost:3000/devices/${index}`, {
            method: 'DELETE',
        })
            .then(() => {
                const updatedDevices = devices.filter((_, i) => i !== index);
                setDevices(updatedDevices);
            })
            .catch(error => console.error('Error deleting device:', error));
    };

    return (
        <div className="enhetsliste">
            <h2>Enhetsliste</h2>

            {/* Input og knapp for å legge til ny enhet */}
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Legg til ny enhet"
                    value={newDevice}
                    onChange={(e) => setNewDevice(e.target.value)}
                    className="input-field"
                />
                <button onClick={addDevice} className="add-button">Legg til</button>
            </div>

            {/* Liste over enheter */}
            {devices.length > 0 ? (
                devices.map((device, index) => (
                    <div key={index} className="enhets-element">
                        <span>{device}</span>
                        <button onClick={() => removeDevice(index)} className="delete-button">Slett</button>
                    </div>
                ))
            ) : (
                <p>Ingen enheter lagt til ennå.</p>
            )}
        </div>
    );
};

export default IoTenheter;
