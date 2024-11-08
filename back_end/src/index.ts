import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { serveStatic } from '@hono/node-server/serve-static';
import db from './db/db';
import { setup } from './db/setup';
import { findUserByCredentials, registerUser } from './db/userRepository';
import { User } from './models/User';

const app = new Hono();

app.use(
  '/*',
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use('/statics/*', serveStatic({ root: './public' }));

app.get('/devices', async (c) => {
  try {
    const devices = db.prepare('SELECT * FROM devices').all();
    return c.json(devices);
  } catch (error) {
    console.error('Error fetching devices:', error);
    return c.text('Internal Server Error. Unable to fetch devices.', 500);
  }
});

app.post('/devices', async (c) => {
  try {
    const newDevice = await c.req.json();
    const result = db
      .prepare('INSERT INTO devices (name, status) VALUES (?, ?)')
      .run(newDevice.name, newDevice.status);
    newDevice.id = result.lastInsertRowid;
    return c.json(newDevice, 201);
  } catch (error) {
    console.error('Error while adding device:', error);
    return c.text('Failed to save device', 500);
  }
});

app.delete('/devices/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'), 10);
    db.prepare('DELETE FROM devices WHERE id = ?').run(id);
    return c.text('Device deleted', 204);
  } catch (error) {
    console.error('Error while deleting device:', error);
    return c.text('Internal Server Error. Unable to delete device.', 500);
  }
});

app.post('/login', async (c) => {
  try {
    const credentials = await c.req.json();
    const user = findUserByCredentials(credentials.username, credentials.password);
    return user ? c.json({ success: true }) : c.json({ success: false }, 401);
  } catch (error) {
    console.error('Error while checking user credentials:', error);
    return c.text('Error while checking user credentials', 500);
  }
});

app.post('/register', async (c) => {
  const { username, email, password } = await c.req.json();
  const existingUser = findUserByCredentials(username, password);
  if (existingUser) {
    return c.json({ message: 'Brukernavnet er allerede tatt' }, 400);
  }
  registerUser(username, password);
  return c.json({ message: 'Bruker registrert' }, 201);
});

app.get('/profile', async (c) => {
  try {
    const profileData = db.prepare('SELECT * FROM users LIMIT 1').get() as User;
    return c.json(profileData);
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return c.text('Error fetching profile data', 500);
  }
});

app.put('/profile', async (c) => {
  try {
    const { password } = await c.req.json();
    db.prepare('UPDATE users SET password = ? WHERE id = ?').run(password, 1);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error updating profile password:', error);
    return c.text('Error updating profile password', 500);
  }
});

(async () => {
  await setup(db);
})();

const port = 6969;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
