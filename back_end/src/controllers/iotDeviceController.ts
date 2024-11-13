import express from 'express';
import * as iotDeviceService from '../service/iotDeviceService';
import { IotDevice } from '../models/IotDevice';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const devices = iotDeviceService.fetchDevices();
    res.json(devices);
  } catch (error) {
    console.error('Error fetching devices:', error instanceof Error ? error.message : error);
    res.status(500).json({ error: 'Internal Server Error. Unable to fetch devices.' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const device = iotDeviceService.fetchDeviceById(req.params.id);
    if (device) {
      res.json(device);
    } else {
      res.status(404).json({ error: 'Device not found' });
    }
  } catch (error) {
    console.error('Error fetching device:', error instanceof Error ? error.message : error);
    res.status(500).json({ error: 'Internal Server Error. Unable to fetch device.' });
  }
});

router.post('/', (req, res) => {
  try {
    const newDevice: IotDevice = req.body;
    iotDeviceService.addDevice(newDevice);
    res.status(201).json(newDevice);
  } catch (error) {
    console.error('Error creating device:', error instanceof Error ? error.message : error);
    res.status(500).json({ error: 'Internal Server Error. Unable to create device.' });
  }
});

router.put('/:id', (req, res) => {
  try {
    const id = req.params.id;
    const updatedDevice: Partial<IotDevice> = req.body;
    iotDeviceService.editDevice(id, updatedDevice);
    res.json({ message: 'Device updated successfully' });
  } catch (error) {
    console.error('Error updating device:', error instanceof Error ? error.message : error);
    res.status(500).json({ error: 'Internal Server Error. Unable to update device.' });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const id = req.params.id;
    iotDeviceService.removeDevice(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting device:', error instanceof Error ? error.message : error);
    res.status(500).json({ error: 'Internal Server Error. Unable to delete device.' });
  }
});

export default router;
