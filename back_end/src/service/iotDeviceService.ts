import * as iotDeviceRepository from '../repository/iotDeviceRepository';
import { IotDevice } from '../models/IotDevice';
import { toIotDevice } from '../mappers/IoTmappers';

export const fetchDevicesByUserId = (userId: string): IotDevice[] => {
  const devices = iotDeviceRepository.getDevicesByUserId(userId);
  return devices.map(toIotDevice);
};

export const fetchDeviceByIdAndUserId = (id: string, userId: string): IotDevice | undefined => {
  const device = iotDeviceRepository.getDeviceByIdAndUserId(id, userId);
  return device ? toIotDevice(device) : undefined;
};

export const addDevice = (device: IotDevice): void => {
  iotDeviceRepository.createDevice(device);
};

export const editDevice = (id: string, userId: string, device: Partial<IotDevice>): boolean => {
  return iotDeviceRepository.updateDevice(id, userId, device);
};

export const removeDevice = (id: string, userId: string): boolean => {
  return iotDeviceRepository.deleteDevice(id, userId);
};
