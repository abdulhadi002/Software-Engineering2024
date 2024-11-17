import * as iotDeviceService from '../service/iotDeviceService';
import { IotDevice } from '../models/IotDevice';
import { Context } from 'hono';
import { getCookie } from 'hono/cookie';

export const getAllDevices = (c: Context) => {
  try {
    const userId = getCookie(c, 'user_id');

    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const devices = iotDeviceService.fetchDevicesByUserId(userId);
    return c.json(devices);
  } catch (error) {
    console.error('Error fetching devices:', error);
    return c.json({ error: 'Internal Server Error. Unable to fetch devices.' }, 500);
  }
};

export const getDeviceById = (c: Context) => {
  try {
    const userId = getCookie(c, 'user_id');

    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    const device = iotDeviceService.fetchDeviceByIdAndUserId(id, userId);
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
    const userId = getCookie(c, 'user_id');
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const newDeviceData = await c.req.json();
    const newDevice: IotDevice = { ...newDeviceData, user_id: userId };

    const transformedData = {
      ...newDeviceData,
      device_status: newDeviceData.device_status.toString()
    }

    iotDeviceService.addDevice(transformedData);
    return c.json(newDevice, 201);
  } catch (error) {
    console.error('Error creating device:', error);
    return c.json({ error: 'Internal Server Error. Unable to create device.' }, 500);
  }
};

export const updateDevice = async (c: Context) => {
  try {
    const userId = getCookie(c, 'user_id');

    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    const updatedDeviceData: Partial<IotDevice> = await c.req.json();
    const success = iotDeviceService.editDevice(id, userId, updatedDeviceData);
    if (success) {
      return c.json({ message: 'Device updated successfully' });
    } else {
      return c.json({ error: 'Device not found or unauthorized' }, 404);
    }
  } catch (error) {
    console.error('Error updating device:', error);
    return c.json({ error: 'Internal Server Error. Unable to update device.' }, 500);
  }
};

export const deleteDevice = (c: Context) => {
  try {
    const userId = getCookie(c, 'user_id');

    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    const success = iotDeviceService.removeDevice(id, userId);
    if (success) {
      return c.text('', 204);
    } else {
      return c.json({ error: 'Device not found or unauthorized' }, 404);
    }
  } catch (error) {
    console.error('Error deleting device:', error);
    return c.json({ error: 'Internal Server Error. Unable to delete device.' }, 500);
  }
};
