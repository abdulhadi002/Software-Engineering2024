import db from '../db/db';
import { DbIotDevice } from '../models/IotDevice';

export const getAllDevices = (): DbIotDevice[] => {
  return db.prepare('SELECT * FROM devices').all() as DbIotDevice[];
};

export const getDevicesByUserId = (user_id: string): DbIotDevice[] => {
  return db.prepare('SELECT * FROM devices WHERE user_id = ?').all(user_id) as DbIotDevice[];
};

export const getDeviceById = (id: number): DbIotDevice | undefined => {
  return db.prepare('SELECT * FROM devices WHERE id = ?').get(id) as DbIotDevice | undefined;
};

export const createDevice = (device: DbIotDevice): void => {
  db.prepare(`
    INSERT INTO devices (id, device_name, device_status, device_version, device_description, device_image, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    device.id,
    device.device_name,
    device.device_status,
    device.device_version,
    device.device_description,
    device.device_image,
    device.user_id
  );
};

export const updateDevice = (id: number, device: Partial<DbIotDevice>): void => {
  db.prepare(`
    UPDATE devices 
    SET 
      device_name = COALESCE(?, device_name),
      device_status = COALESCE(?, device_status),
      device_version = COALESCE(?, device_version),
      device_description = COALESCE(?, device_description),
      device_image = COALESCE(?, device_image),
      user_id = COALESCE(?, user_id)
    WHERE id = ?
  `).run(
    device.device_name,
    device.device_status,
    device.device_version,
    device.device_description,
    device.device_image,
    device.user_id,
    id
  );
};

export const deleteDevice = (id: number): void => {
  db.prepare('DELETE FROM devices WHERE id = ?').run(id);
};
