import { findUserByUsername, createUser } from '../repository/userRepository';
import { User } from '../models/User';

export const authenticateUser = (username: string, password: string) => {
  const user = findUserByUsername(username);

  if (user && user.password === password) {
    const { password, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
  } else {
    return { success: false, message: 'Invalid username or password' };
  }
};

export const registerUser = (username: string, password: string) => {
  const existingUser = findUserByUsername(username);

  if (existingUser) {
    return { success: false, message: 'Username is already taken' };
  }

  const newUser: User = {
    id: '',
    username,
    password,
  };

  createUser(newUser);

  return { success: true, user: newUser };
};

export const getUserByUsername = (username: string): User | null => {
  const user = findUserByUsername(username);
  if (!user) {
    return null;
  }
  return user;
};
