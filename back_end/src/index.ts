import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { serveStatic } from '@hono/node-server/serve-static';
import { readFile, writeFile } from 'node:fs/promises';
import db from './db/db';
import { setup } from './db/setup';
import path from 'node:path';
import { findUserByCredentials, registerUser } from './db/userRepository';

const app = new Hono();

app.use(
  '/*',
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use('/statics/*', serveStatic({ root: './public' }));

const dataFilePath = path.resolve(__dirname, './data.json');
const personDataFilePath = path.resolve(__dirname, './PersonData.json');


app.get('/devices', async (c) => {
  try {
    const data = await readFile(dataFilePath, 'utf-8');
    const devices = JSON.parse(data);
    return c.json(devices);
  } catch (error) {
    console.error('Error fetching devices:', error);
    return c.text('Internal Server Error. Unable to fetch devices.', 500);
  }
});


app.post('/devices', async (c) => {
  try {
    const newDevice = await c.req.json();
    const data = await readFile(dataFilePath, 'utf-8');
    const devices = JSON.parse(data).devices;

    newDevice.id = devices.length ? devices[devices.length - 1].id + 1 : 1;
    devices.push(newDevice);

    await writeFile(dataFilePath, JSON.stringify({ devices }, null, 2));
    return c.json(newDevice, 201);
  } catch (error) {
    console.error('Error while adding device:', error);
    return c.text('Failed to save device', 500);
  }
});


app.delete('/devices/:index', async (c) => {
  try {
    const index = parseInt(c.req.param('index'), 10);
    const data = await readFile(dataFilePath, 'utf-8');
    const devices = JSON.parse(data).devices;

    if (isNaN(index) || index < 0 || index >= devices.length) {
      return c.text('Invalid index', 400);
    }

    devices.splice(index, 1);
    await writeFile(dataFilePath, JSON.stringify({ devices }, null, 2));
    return c.text('Device deleted', 204);
  } catch (error) {
    console.error('Error while deleting device:', error);
    return c.text('Internal Server Error. Unable to delete device.', 500);
  }
});


app.post('/login', async (c) => {
  try {
    const credentials = await c.req.json();
    const data = await readFile(personDataFilePath, 'utf-8');
    const users = JSON.parse(data);
    const isValidUser = users.some(
      (user: { userName: string; password: string }) =>
        user.userName === credentials.userName &&
        user.password === credentials.password
    );

    return isValidUser ? c.json({ success: true }) : c.json({ success: false }, 401);
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
    const data = await readFile(personDataFilePath, 'utf-8');
    const users = JSON.parse(data);
    const profileData = users[0];
    return c.json(profileData);
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return c.text('Error fetching profile data', 500);
  }
});


app.put('/profile', async (c) => {
  try {
    const { password } = await c.req.json();
    const data = await readFile(personDataFilePath, 'utf-8');
    const users = JSON.parse(data);
    users[0] = { ...users[0], password };

    await writeFile(personDataFilePath, JSON.stringify(users, null, 2));
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
