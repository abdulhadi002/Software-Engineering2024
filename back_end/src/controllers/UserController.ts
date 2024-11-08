import db from '../db/db';
import { mapRowToUser, mapUserToRow } from '../db/UserMapper';
import { User } from '../models/User';

export const getAllUsers = (): User[] => {
    const stmt = db.prepare('SELECT * FROM users');
    const rows = stmt.all();
    return rows.map(mapRowToUser);
};

export const createUser = (user: User): void => {
    const stmt = db.prepare('INSERT INTO users (id, username, email, created_at) VALUES (?, ?, ?, ?)');
    const row = mapUserToRow(user);
    stmt.run(row.id, row.username, row.email, row.created_at);
};
