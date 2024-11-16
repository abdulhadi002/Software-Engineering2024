import db from '../db/db';
import { User } from '../models/User';
import { mapRowToUser } from '../mappers/UserMapper';

export const findUserByUsername = (username: string): User | undefined => {
  const row = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  return row ? mapRowToUser(row) : undefined;
};

export const createUser = (user: User): User => {
  const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
  const result = stmt.run(user.username, user.password);
  const insertedId = Number(result.lastInsertRowid);

  return {
    id: insertedId,
    username: user.username,
    password: user.password,
  };
};