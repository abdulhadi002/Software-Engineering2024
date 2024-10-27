import { join } from 'path';
import { readFile } from 'fs/promises';
import type { DB } from './db';

export const seed = async (db: DB) => {
  const path = join(__dirname, 'data.json');
  const file = await readFile(path, 'utf-8');
  const { users, devices } = JSON.parse(file) as {
    users: { username: string; password: string }[];
    devices: { id: string; name: string; type: string; user_id: string; purchased_at: string; status: string }[];
  };

  const insertUser = db.prepare(`
    INSERT INTO users (username, password) 
    VALUES (?, ?)
    ON CONFLICT (username) DO NOTHING
  `);

  const insertDevice = db.prepare(`
    INSERT INTO devices (id, name, type, user_id, purchased_at, status) 
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT (id) DO NOTHING
  `);

  db.transaction(() => {
    for (const user of users) {
      insertUser.run(user.username, user.password);
    }

    for (const device of devices) {
      insertDevice.run(device.id, device.name, device.type, device.user_id, device.purchased_at, device.status);
    }
  })();
};
