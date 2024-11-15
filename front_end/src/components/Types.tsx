import React from 'react';

export type DeviceData = {
  device_name: string;
  device_status: boolean;
  device_version: string;
  device_description: string;
  device_image: string;
};  

export type LoginInformation = {
  username: string;
  password: string;
};

export type LoginProps = {
  credentials: LoginInformation;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isRegistering: boolean;
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}

export type ProfileData = {
  name: string;
  image: string;
};
