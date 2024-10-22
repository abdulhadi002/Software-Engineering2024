import React, { useState } from 'react';
import './iotenheter.css';

const IoTenheter: React.FC = () => {
    // State for å holde på listen over IoT-enheter
    const [devices, setDevices] = useState<string[]>([]);
    const [newDevice, setNewDevice] = useState<string>("");

    // Funksjon for å legge til en ny IoT-enhet
    const addDevice = () => {
        if (newDevice.trim() !== "") {
            setDevices([...devices, newDevice]);
            setNewDevice(""); // Resetter inputfeltet
        }
    };

    // Funksjon for å slette en spesifikk enhet
    const removeDevice = (index: number) => {
        const updatedDevices = devices.filter((_, i) => i !== index);
        setDevices(updatedDevices);
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
