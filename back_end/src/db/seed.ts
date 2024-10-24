import { join } from 'path';
import { readFile } from 'fs/promises';
import type { DB } from "./db";

export const seed = async (db: DB) => {
  const path = join(__dirname, "data.json");
  const file = await readFile(path, "utf-8");
  const { users, devices } = JSON.parse(file) as {
    users: { id: string; email: string; name: string; password: string; created_at: string }[];
    devices: { id: string; name: string; type: string; user_id: string; purchased_at: string; status: string }[];
  };

  const insertUser = db.prepare(`
    INSERT INTO users (id, email, name, password, created_at) VALUES (?, ?, ?, ?, ?)
  `);
  const findUserByEmail = db.prepare(`
    SELECT * FROM users WHERE email = ?
  `);
  const insertDevice = db.prepare(`
    INSERT INTO devices (id, name, type, user_id, purchased_at, status) VALUES (?, ?, ?, ?, ?, ?)
  `);
  const findDeviceById = db.prepare(`
    SELECT * FROM devices WHERE id = ?
  `);

  db.transaction(() => {
    for (const user of users) {
      const existingUser = findUserByEmail.get(user.email);
      if (!existingUser) {
        insertUser.run(user.id, user.email, user.name, user.password, user.created_at);
      }
    }

    for (const device of devices) {
      const existingDevice = findDeviceById.get(device.id);
      if (!existingDevice) {
        insertDevice.run(device.id, device.name, device.type, device.user_id, device.purchased_at, device.status);
      }
    }
  })();
};
