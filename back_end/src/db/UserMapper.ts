import { User } from '../models/User';

export const mapRowToUser = (row: any): User => {
    return {
        id: row.id,
        username: row.username,
        email: row.email,
        createdAt: new Date(row.created_at)
    };
};

export const mapUserToRow = (user: User): any => {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.createdAt.toISOString()
    };
};
