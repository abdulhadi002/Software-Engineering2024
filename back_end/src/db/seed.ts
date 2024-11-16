import { join } from 'path';
import { readFile } from 'fs/promises';
import type { DB } from './db';
import { DbIotDevice } from '../models/IotDevice'; 
export const seed = async (db: DB) => {
  console.log('Seeding database...');
  try {
    const path = join(__dirname, 'data.json');
    const file = await readFile(path, 'utf-8');

   
    const { users, devices } = JSON.parse(file) as {
      users: { id: number; username: string; password: string }[];
      devices: DbIotDevice[];
    };

    const insertUser = db.prepare(`
      INSERT INTO users (id, username, password) 
      VALUES (?, ?, ?)
      ON CONFLICT (username) DO NOTHING
    `);

    const insertDevice = db.prepare(`
      INSERT INTO devices (
        id, 
        device_name, 
        device_status, 
        device_version, 
        device_description, 
        device_image, 
        user_id
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT (id) DO NOTHING
    `);

    const insertUsers = db.transaction(() => {
      for (const user of users) {
        insertUser.run(user.id, user.username, user.password);
        console.log(`Inserted user: ${user.username}`);
      }
    });

    const insertDevices = db.transaction(() => {
      for (const device of devices) {
        const device_status = device.device_status ? 1 : 0;

        insertDevice.run(
          device.id,
          device.device_name,
          device_status,
          device.device_version,
          device.device_description,
          device.device_image,
          device.user_id
        );
        console.log(`Inserted device: ${device.device_name}`);
      }
    });

    insertUsers();
    insertDevices();

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding the database:', error);
    throw error;
  }
};
