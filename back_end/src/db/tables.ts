import type { DB } from "./db";

export const createTables = (db: DB) => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS devices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_name TEXT NOT NULL,
      device_status BOOLEAN NOT NULL,
      device_version TEXT NOT NULL,
      device_description TEXT,
      device_image TEXT,
      user_id INTEGER NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

  `);

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_devices_userId ON devices(user_id);
  `);
};
