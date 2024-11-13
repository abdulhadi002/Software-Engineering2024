import db from '../db/db';
import { User } from '../models/User';
import { mapRowToUser, mapUserToRow } from '../mappers/UserMapper';

export const findUserByUsername = (username: string): User | undefined => {
  const row = db
    .prepare('SELECT * FROM users WHERE username = ?')
    .get(username);

  return row ? mapRowToUser(row) : undefined;
};

export const createUser = (user: User): void => {
  db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(
    user.username,
    user.password
  );
};