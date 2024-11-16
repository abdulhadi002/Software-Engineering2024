import { DbIotDevice } from '../models/IotDevice';
import db from '../db/db';

export const getDevicesByUserId = (userId: string): DbIotDevice[] => {
  const stmt = db.prepare('SELECT * FROM devices WHERE user_id = ?');
  return stmt.all(userId) as DbIotDevice[];
};

export const getDeviceByIdAndUserId = (id: string, userId: string): DbIotDevice | undefined => {
  const stmt = db.prepare('SELECT * FROM devices WHERE id = ? AND user_id = ?');
  return stmt.get(id, userId) as DbIotDevice | undefined;
};

export const createDevice = (device: DbIotDevice): void => {
  const stmt = db.prepare(`
    INSERT INTO devices (device_name, device_status, device_version, device_description, device_image, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    device.device_name,
    device.device_status,
    device.device_version,
    device.device_description,
    device.device_image,
    device.user_id
  );
};

export const updateDevice = (id: string, userId: string, device: Partial<DbIotDevice>): boolean => {
  const fields = [];
  const values: any[] = [];
  
  if (device.device_name !== undefined) {
    fields.push('device_name = ?');
    values.push(device.device_name);
  }
  if (device.device_status !== undefined) {
    fields.push('device_status = ?');
    values.push(device.device_status);
  }
  if (device.device_version !== undefined) {
    fields.push('device_version = ?');
    values.push(device.device_version);
  }
  if (device.device_description !== undefined) {
    fields.push('device_description = ?');
    values.push(device.device_description);
  }
  if (device.device_image !== undefined) {
    fields.push('device_image = ?');
    values.push(device.device_image);
  }

  if (fields.length === 0) {
    return false;
  }

  values.push(id, userId);
  const stmt = db.prepare(`UPDATE devices SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`);
  const result = stmt.run(...values);
  return result.changes > 0;
};

export const deleteDevice = (id: string, userId: string): boolean => {
  const stmt = db.prepare('DELETE FROM devices WHERE id = ? AND user_id = ?');
  const result = stmt.run(id, userId);
  return result.changes > 0;
};
