import { User } from '../models/User';

export const mapRowToUser = (row: any): User => {
  return {
    id: row.id,
    username: row.username,
    password: row.password,
  };
};

export const mapUserToRow = (user: User): { id: number; username: string; password: string } => {
  return {
    id: user.id,
    username: user.username,
    password: user.password,
  };
};
