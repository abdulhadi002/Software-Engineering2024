import db from '../db/db';
import { mapUserToRow } from '../mappers/UserMapper';
import { User } from '../models/User';
import { Context } from 'hono';

export const getAllUsers = (c: Context) => {
  try {
    const stmt = db.prepare('SELECT * FROM users');
    const rows = stmt.all() as { id: string; username: string; password: string; image?: string; membership?: string }[];
    const users = rows.map(mapUserToRow);
    return c.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return c.json({ error: 'Internal Server Error. Unable to fetch users.' }, 500);
  }
};

export const getUserByUsername = (c: Context) => {
  try {
    const username = c.req.param('username');
    const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
    const user = stmt.get(username) as User | undefined;

    if (user) {
      return c.json(user, 200);
    } else {
      return c.json({ error: 'User not found' }, 404);
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return c.json({ error: 'Internal Server Error. Unable to fetch user.' }, 500);
  }
};

export const createUser = async (c: Context) => {
  try {
    console.log('Creating a new user...');
    const user: User = await c.req.json();
    const existingUser = db.prepare('SELECT * FROM users WHERE username = ?').get(user.username);

    if (existingUser) {
      console.error(`User ${user.username} already exists`);
      return c.json({ error: 'Username already exists' }, 400);
    }

    const stmt = db.prepare('INSERT INTO users (username, password, image, membership) VALUES (?, ?, ?, ?)');
    stmt.run(user.username, user.password, user.image || null, user.membership || null);

    console.log(`User ${user.username} created successfully`);
    return c.json(user, 201);
  } catch (error) {
    console.error('Error creating user:', error);
    return c.json({ error: 'Internal Server Error. Unable to create user.' }, 500);
  }
};
