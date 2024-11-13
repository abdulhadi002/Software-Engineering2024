import * as iotDeviceService from '../service/iotDeviceService';
import { IotDevice } from '../models/IotDevice';
import { Context } from 'hono';

export const getAllDevices = (c: Context) => {
  try {
    const devices = iotDeviceService.fetchDevices();
    return c.json(devices);
  } catch (error) {
    console.error('Error fetching devices:', error);
    return c.json({ error: 'Internal Server Error. Unable to fetch devices.' }, 500);
  }
};

export const getDeviceById = (c: Context) => {
  try {
    const id = c.req.param('id');
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
    const newDevice: IotDevice = await c.req.json();
    iotDeviceService.addDevice(newDevice);
    return c.json(newDevice, 201);
  } catch (error) {
    console.error('Error creating device:', error);
    return c.json({ error: 'Internal Server Error. Unable to create device.' }, 500);
  }
};

export const updateDevice = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const updatedDevice: Partial<IotDevice> = await c.req.json();
    iotDeviceService.editDevice(id, updatedDevice);
    return c.json({ message: 'Device updated successfully' });
  } catch (error) {
    console.error('Error updating device:', error);
    return c.json({ error: 'Internal Server Error. Unable to update device.' }, 500);
  }
};

export const deleteDevice = (c: Context) => {
  try {
    const id = c.req.param('id');
    iotDeviceService.removeDevice(id);
    return c.text('', 204);
  } catch (error) {
    console.error('Error deleting device:', error);
    return c.json({ error: 'Internal Server Error. Unable to delete device.' }, 500);
  }
};
