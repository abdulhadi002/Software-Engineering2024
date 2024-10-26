import db from './db';

export interface DbIotDevice {
  id: string;
  navn: string;
  enhetsStatus: string;
  versjon: string;
  beskrivelse: string;
}

export const getAllDevices = (): DbIotDevice[] => {
  return db.prepare('SELECT * FROM iot_devices').all();
};

export const getDeviceById = (id: string): DbIotDevice | undefined => {
  return db.prepare('SELECT * FROM iot_devices WHERE id = ?').get(id);
};

export const createDevice = (device: DbIotDevice): void => {
  db.prepare('INSERT INTO iot_devices (id, navn, enhetsStatus, versjon, beskrivelse) VALUES (?, ?, ?, ?, ?)').run(
    device.id,
    device.navn,
    device.enhetsStatus,
    device.versjon,
    device.beskrivelse
  );
};

export const updateDevice = (id: string, device: Partial<DbIotDevice>): void => {
  db.prepare('UPDATE iot_devices SET navn = ?, enhetsStatus = ?, versjon = ?, beskrivelse = ? WHERE id = ?').run(
    device.navn,
    device.enhetsStatus,
    device.versjon,
    device.beskrivelse,
    id
  );
};

export const deleteDevice = (id: string): void => {
  db.prepare('DELETE FROM iot_devices WHERE id = ?').run(id);
};
