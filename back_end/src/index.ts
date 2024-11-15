import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';

import * as authController from './controllers/authController';
import * as iotDeviceController from './controllers/iotDeviceController';
import * as userController from './controllers/UserController';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: 'http://localhost:5173',
  })
);


app.post('/login', authController.login);
app.post('/register', authController.register);


app.get('/iot-devices', iotDeviceController.getAllDevices);
app.get('/iot-devices/user', iotDeviceController.getDevicesByUserId);
app.get('/iot-devices/:id', iotDeviceController.getDeviceById);
app.post('/iot-devices', iotDeviceController.createDevice);
app.put('/iot-devices/:id', iotDeviceController.updateDevice);
app.delete('/iot-devices/:id', iotDeviceController.deleteDevice);


app.get('/users', userController.getAllUsers);
app.post('/users', userController.createUser);

const port = 6969;

serve({
  fetch: app.fetch,
  port: port,
});

console.log(`Server is running on port ${port}`);
