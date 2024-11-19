export type User = {
  id: number; 
  username: string; 
  password: string; 
  image?: string; 
  membership?: string
  }
  
  export type UserWithoutPassword = Omit<User, 'password'>;
  
  export type AuthSuccessResult = {
    success: true;
    user: UserWithoutPassword;
  };
  
  export type AuthFailureResult = {
    success: false;
    message: string;
  };
  
  export type AuthResult = AuthSuccessResult | AuthFailureResult;