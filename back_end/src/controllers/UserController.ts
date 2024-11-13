import db from '../db/db';
import { mapUserToRow } from '../mappers/UserMapper';
import { User } from '../models/User';
import { Context } from 'hono';

export const getAllUsers = (c: Context) => {
  try {
    const stmt = db.prepare('SELECT * FROM users');
    const rows = stmt.all() as { id: string; username: string; password: string }[];
    const users = rows.map(mapUserToRow);
    return c.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return c.json({ error: 'Internal Server Error. Unable to fetch users.' }, 500);
  }
};

export const createUser = async (c: Context) => {
  try {
    const user: User = await c.req.json();
    const stmt = db.prepare('INSERT INTO users (id, username, password) VALUES (?, ?, ?)');
    const row = mapUserToRow(user);
    stmt.run(row.id, row.username, row.password);
    return c.json(user, 201);
  } catch (error) {
    console.error('Error creating user:', error);
    return c.json({ error: 'Internal Server Error. Unable to create user.' }, 500);
  }
};
