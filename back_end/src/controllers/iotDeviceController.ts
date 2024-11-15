import * as iotDeviceService from '../service/iotDeviceService';
import { Context } from 'hono';
import * as authService from '../service/authService';

export const getAllDevices = (c: Context) => {
  try {
    const devices = iotDeviceService.fetchDevices();
    return c.json(devices);
  } catch (error) {
    console.error('Error fetching devices:', error);
    return c.json({ error: 'Internal Server Error. Unable to fetch devices.' }, 500);
  }
};

export const getDevicesByUserId = async (c: Context) => {
  try {
    const username = c.req.header('username');
    if (!username) {
      return c.json({ error: 'Username header is required' }, 400);
    }

    const user = authService.getUserByUsername(username);
    if (!user) {
      return c.json({ error: 'Invalid username' }, 401);
    }

    const devices = iotDeviceService.fetchDevicesByUsername(user.id);
    return c.json(devices);
  } catch (error) {
    console.error('Error fetching devices for user:', error);
    return c.json({ error: 'Internal Server Error. Unable to fetch devices.' }, 500);
  }
};

export const getDeviceById = (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) {
      return c.json({ error: 'Invalid device ID' }, 400);
    }
    const device = iotDeviceService.fetchDeviceById(id);
    if (device) {
      return c.json(device);
    } else {
      return c.json({ error: 'Device not found' }, 404);
    }
  } catch (error) {
    console.error('Error fetching device:', error);
    return c.json({ error: 'Internal Server Error. Unable to fetch device.' }, 500);
  }
};

export const createDevice = async (c: Context) => {
  try {
    const username = c.req.header('username');
    if (!username) {
      return c.json({ error: 'Username header is required' }, 400);
    }

    const newDevice = await c.req.json();
    iotDeviceService.addDevice(newDevice, username);
    return c.json(newDevice, 201);
  } catch (error) {
    console.error('Error creating device:', error);
    return c.json({ error: 'Internal Server Error. Unable to create device.' }, 500);
  }
};


export const updateDevice = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) {
      return c.json({ error: 'Invalid device ID' }, 400);
    }
    const updatedDevice = await c.req.json();
    iotDeviceService.editDevice(id, updatedDevice);
    return c.json({ message: 'Device updated successfully' });
  } catch (error) {
    console.error('Error updating device:', error);
    return c.json({ error: 'Internal Server Error. Unable to update device.' }, 500);
  }
};

export const deleteDevice = (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) {
      return c.json({ error: 'Invalid device ID' }, 400);
    }
    iotDeviceService.removeDevice(id);
    return c.text('', 204);
  } catch (error) {
    console.error('Error deleting device:', error);
    return c.json({ error: 'Internal Server Error. Unable to delete device.' }, 500);
  }
};