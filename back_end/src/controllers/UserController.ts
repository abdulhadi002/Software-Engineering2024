import db from '../db/db';
import { mapRowToUser, mapUserToRow } from '../db/UserMapper';
import { User } from '../models/User';

export const getAllUsers = (): User[] => {
    const stmt = db.prepare('SELECT * FROM users');
    const rows = stmt.all() as { id: string; username: string; password: string }[];
    return rows.map(mapRowToUser);
};

export const createUser = (user: User): void => {
    const stmt = db.prepare('INSERT INTO users (id, username, password) VALUES (?, ?, ?)');
    const row = mapUserToRow(user);
    stmt.run(row.id, row.username, row.password);
};
