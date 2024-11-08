import db from './db';

export interface User {
  id: string;
  username: string;
  password: string;
}

export const findUserByCredentials = (username: string, password: string): User | undefined => {
  const result = db
    .prepare('SELECT * FROM users WHERE username = ? AND password = ?')
    .get(username, password);
  return result as User | undefined;
};

export const registerUser = (username: string, password: string): void => {
  db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, password);
};