import { findUserByCredentials } from '../repository/userRepository';

export const authenticateUser = (username: string, password: string) => {
  const user = findUserByCredentials(username, password);
  if (user) {
    const { password, ...userWithoutPassword } = user;  
    return { success: true, user: userWithoutPassword };
  } else {
    return { success: false, message: 'Ugyldig brukernavn eller passord' };
  }
};
