import * as iotDeviceRepository from '../repository/iotDeviceRepository';
import { IotDevice } from '../models/IotDevice';

export const fetchDevices = (): IotDevice[] => {
  return iotDeviceRepository.getAllDevices().map(device => ({
    id: device.id,
    navn: device.navn,
    enhetsStatus: device.enhetsStatus,
    versjon: device.versjon,
    beskrivelse: device.beskrivelse
  }));
};

export const fetchDeviceById = (id: string): IotDevice | undefined => {
  const device = iotDeviceRepository.getDeviceById(id);
  return device ? {
    id: device.id,
    navn: device.navn,
    enhetsStatus: device.enhetsStatus,
    versjon: device.versjon,
    beskrivelse: device.beskrivelse
  } : undefined;
};

export const addDevice = (device: IotDevice): void => {
  iotDeviceRepository.createDevice(device);
};

export const editDevice = (id: string, device: Partial<IotDevice>): void => {
  iotDeviceRepository.updateDevice(id, device);
};

export const removeDevice = (id: string): void => {
  iotDeviceRepository.deleteDevice(id);
};