import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';

import * as authController from './controllers/authController';
import * as iotDeviceController from './controllers/iotDeviceController';
import * as userController from './controllers/UserController';

import db from '../src/db/db';
import { setup } from '../src/db/setup';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

app.post('/login', authController.login);
app.post('/register', authController.register);

app.get('/IotEnheter', iotDeviceController.getAllDevices);
app.get('/IotEnheter/:id', iotDeviceController.getDeviceById);
app.post('/IotEnheter', iotDeviceController.createDevice);
app.put('/IotEnheter/:id', iotDeviceController.updateDevice);
app.delete('/IotEnheter/:id', iotDeviceController.deleteDevice);

app.get('/users', userController.getAllUsers);
app.post('/users', userController.createUser);


const port = 6969;

const startServer = async () => {
  try {
    console.log('Initializing database setup...');
    await setup(db);
    console.log('Database setup completed successfully.');

    serve({
      fetch: app.fetch,
      port: port,
    });

    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error('Failed to initialize the server:', error);
    process.exit(1);
  }
};

startServer();