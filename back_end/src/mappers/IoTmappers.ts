import { DbIotDevice, IotDevice } from "../models/IotDevice";

  
  export const toIotDevice = (dbDevice: DbIotDevice): IotDevice => ({
    id: dbDevice.id,
    navn: dbDevice.navn,
    enhetsStatus: dbDevice.enhetsStatus,
    versjon: dbDevice.versjon,
    beskrivelse: dbDevice.beskrivelse,
  });
  