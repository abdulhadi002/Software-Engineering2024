export type DeviceData = {
    device_name: string;
    device_status: boolean;
    device_version: string;
    device_description: string;
    device_image: string;
  };  

  export type LoginInformation = {
    userName: string;
    password: string; 
  };

  interface LoginProps {
    checkUserCredentials: (credentials: LoginInformation) => void;
    registerNewUser: (credentials: LoginInformation) => void;
  }

  export type ProfileData = {
    userName: string;
    password: string;
    membership: 'Basic' | 'Premium';
  };