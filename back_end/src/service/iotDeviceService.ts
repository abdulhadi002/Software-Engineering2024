import * as iotDeviceRepository from '../repository/iotDeviceRepository';
import * as authService from '../service/authService';
import { DbIotDevice, IotDevice } from '../models/IotDevice';

export const fetchDevices = (): IotDevice[] => {
  return iotDeviceRepository.getAllDevices().map(device => ({
    id: device.id,
    device_name: device.device_name,
    device_status: device.device_status,
    device_version: device.device_version,
    device_description: device.device_description,
    device_image: device.device_image
  }));
};

export const fetchDevicesByUsername = (username: string): IotDevice[] => {
  const user = authService.getUserByUsername(username);
  if (!user) {
    throw new Error('User not found');
  }
  return iotDeviceRepository.getDevicesByUserId(user.id).map(device => ({
    id: device.id,
    device_name: device.device_name,
    device_status: device.device_status,
    device_version: device.device_version,
    device_description: device.device_description,
    device_image: device.device_image
  }));
};

export const fetchDeviceById = (id: number): IotDevice | undefined => {
  const device = iotDeviceRepository.getDeviceById(id);
  return device
    ? {
        id: device.id,
        device_name: device.device_name,
        device_status: device.device_status,
        device_version: device.device_version,
        device_description: device.device_description,
        device_image: device.device_image
      }
    : undefined;
};

export const addDevice = (device: IotDevice, username: string): void => {
  const user = authService.getUserByUsername(username);
  if (!user) {
    throw new Error('User not found');
  }
  const dbDevice: DbIotDevice = {
    ...device,
    user_id: user.id
  };
  iotDeviceRepository.createDevice(dbDevice);
};

export const editDevice = (id: number, device: Partial<IotDevice>): void => {
  const dbDevice: Partial<DbIotDevice> = {
    ...device
  };
  iotDeviceRepository.updateDevice(id, dbDevice);
};

export const removeDevice = (id: number): void => {
  iotDeviceRepository.deleteDevice(id);
};
