export interface DbIotDevice {
    id: string;
    navn: string;
    enhetsStatus: string;
    versjon: string;
    beskrivelse: string;
  }
  
  export interface IotDevice {
    id: string;
    navn: string;
    enhetsStatus: string;
    versjon: string;
    beskrivelse: string;
  }
  
  export const toIotDevice = (dbDevice: DbIotDevice): IotDevice => ({
    id: dbDevice.id,
    navn: dbDevice.navn,
    enhetsStatus: dbDevice.enhetsStatus,
    versjon: dbDevice.versjon,
    beskrivelse: dbDevice.beskrivelse,
  });
  