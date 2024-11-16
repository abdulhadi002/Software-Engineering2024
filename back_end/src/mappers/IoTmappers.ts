import { DbIotDevice, IotDevice } from '../models/IotDevice';

export const toIotDevice = (dbDevice: DbIotDevice): IotDevice => ({
  id: dbDevice.id,
  device_name: dbDevice.device_name,
  device_status: dbDevice.device_status,
  device_version: dbDevice.device_version,
  device_description: dbDevice.device_description,
  device_image: dbDevice.device_image,
  user_id: dbDevice.user_id,
});
