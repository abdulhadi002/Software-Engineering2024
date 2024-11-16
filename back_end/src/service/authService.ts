import { findUserByUsername, createUser } from '../repository/userRepository';
import { User, UserWithoutPassword, AuthResult } from '../models/User';

export const authenticateUser = (username: string, password: string): AuthResult => {
  const user = findUserByUsername(username);

  if (user && user.password === password) {
    const { password, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
  } else {
    return { success: false, message: 'Invalid username or password' };
  }
};

export const registerUser = (username: string, password: string): AuthResult => {
  const existingUser = findUserByUsername(username);

  if (existingUser) {
    return { success: false, message: 'Username is already taken' };
  }

  const newUser: User = {
    id: 0,
    username,
    password,
  };

  const createdUser = createUser(newUser);

  const { password: _, ...userWithoutPassword } = createdUser;

  return { success: true, user: userWithoutPassword };
};
