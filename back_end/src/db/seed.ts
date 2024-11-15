import { join } from "path";
import { readFile } from "fs/promises";
import type { DB } from "./db";

export const seed = async (db: DB) => {
  const path = join(__dirname, "data.json");
  const file = await readFile(path, "utf-8");
  const { users, devices } = JSON.parse(file) as {
    users: { username: string; password: string }[];
    devices: {
      id: number;
      device_name: string;
      device_status: boolean;
      device_version: string;
      device_description: string;
      device_image: string;
      user_id: number;
    }[];
  };

  const insertUser = db.prepare(`
    INSERT INTO users (username, password) 
    VALUES (?, ?)
    ON CONFLICT (username) DO NOTHING
  `);

  const insertDevice = db.prepare(`
    INSERT INTO devices (id, device_name, device_status, device_version, device_description, device_image, user_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (id) DO NOTHING
  `);

  db.transaction(() => {
    for (const user of users) {
      insertUser.run(user.username, user.password);
    }

    for (const device of devices) {
      insertDevice.run(
        device.id,
        device.device_name,
        device.device_status,
        device.device_version,
        device.device_description,
        device.device_image,
        device.user_id
      );
    }
  })();
};
