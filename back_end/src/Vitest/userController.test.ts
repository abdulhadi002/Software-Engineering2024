import { describe, it, expect, vi, beforeEach } from 'vitest';
import db from '../db/db';
import { mapUserToRow } from '../mappers/UserMapper';
import { getAllUsers, getUserByUsername, createUser } from '../controllers/UserController';
import { Context } from 'hono';
import { User } from '../models/User';

vi.mock('../db/db', () => ({
    default: {
      prepare: vi.fn(),
    },
}));
vi.mock('../mappers/UserMapper', () => ({
    mapUserToRow: vi.fn((row) => ({
      id: row.id,
      username: row.username,
      image: row.image,
      membership: row.membership,
    })),
}));

describe('User Controller', () => {
  let mockContext: Context;

  beforeEach(() => {
    mockContext = {
      req: {
        param: vi.fn(),
        json: vi.fn(),
      },
      json: vi.fn(),
    } as unknown as Context;

    vi.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return all users', () => {
      const mockRows = [
        { id: 1, username: 'user1', password: 'pass1', image: 'img1', membership: 'gold' },
        { id: 2, username: 'user2', password: 'pass2', image: 'img2', membership: 'silver' },
      ];
      const mockMappedRows = [
        { id: 1, username: 'user1', image: 'img1', membership: 'gold' },
        { id: 2, username: 'user2', image: 'img2', membership: 'silver' },
      ];
  
      vi.mocked(db.prepare).mockReturnValue({
        all: vi.fn().mockReturnValueOnce(mockRows),
      } as any);
  
      getAllUsers(mockContext);
  
      expect(db.prepare).toHaveBeenCalledWith('SELECT * FROM users');
      expect(mapUserToRow).toHaveBeenCalledTimes(mockRows.length);
      expect(mockContext.json).toHaveBeenCalledWith(mockMappedRows);
    });

    it('should handle database errors gracefully', () => {
      vi.mocked(db.prepare).mockImplementation(() => {
        throw new Error('Database error');
      });

      getAllUsers(mockContext);

      expect(mockContext.json).toHaveBeenCalledWith(
        { error: 'Internal Server Error. Unable to fetch users.' },
        500
      );
    });
  });

  describe('getUserByUsername', () => {
    it('should return a user if found', () => {
      const mockUser: User = {
        id: 1,
        username: 'user1',
        password: 'pass1',
        image: 'img1',
        membership: 'gold',
      };

      vi.mocked(mockContext.req.param).mockReturnValueOnce('user1');
      vi.mocked(db.prepare).mockReturnValue({
        get: vi.fn().mockReturnValueOnce(mockUser),
      } as any);

      getUserByUsername(mockContext);

      expect(db.prepare).toHaveBeenCalledWith('SELECT * FROM users WHERE username = ?');
      expect(mockContext.json).toHaveBeenCalledWith(mockUser, 200);
    });

    it('should return 404 if user is not found', () => {
      vi.mocked(mockContext.req.param).mockReturnValueOnce('nonexistent');
      vi.mocked(db.prepare).mockReturnValue({
        get: vi.fn().mockReturnValueOnce(undefined),
      } as any);

      getUserByUsername(mockContext);

      expect(mockContext.json).toHaveBeenCalledWith({ error: 'User not found' }, 404);
    });

    it('should handle database errors gracefully', () => {
      vi.mocked(mockContext.req.param).mockReturnValueOnce('user1');
      vi.mocked(db.prepare).mockImplementation(() => {
        throw new Error('Database error');
      });

      getUserByUsername(mockContext);

      expect(mockContext.json).toHaveBeenCalledWith(
        { error: 'Internal Server Error. Unable to fetch user.' },
        500
      );
    });
  });

  describe('createUser', () => {
    it('should create a new user if username does not exist', async () => {
      const newUser: User = {
        id: 1,
        username: 'newuser',
        password: 'newpass',
        image: 'newimg',
        membership: 'gold',
      };

      vi.mocked(mockContext.req.json).mockResolvedValueOnce(newUser);
      vi.mocked(db.prepare).mockReturnValueOnce({
        get: vi.fn().mockReturnValueOnce(undefined),
      } as any);
      vi.mocked(db.prepare).mockReturnValueOnce({
        run: vi.fn(),
      } as any);

      await createUser(mockContext);

      expect(db.prepare).toHaveBeenCalledWith('SELECT * FROM users WHERE username = ?');
      expect(db.prepare).toHaveBeenCalledWith(
        'INSERT INTO users (username, password, image, membership) VALUES (?, ?, ?, ?)'
      );
      expect(mockContext.json).toHaveBeenCalledWith(newUser, 201);
    });

    it('should return 400 if username already exists', async () => {
      const existingUser: User = {
        id: 1,
        username: 'existinguser',
        password: 'pass',
        image: 'img',
        membership: 'gold',
      };

      vi.mocked(mockContext.req.json).mockResolvedValueOnce(existingUser);
      vi.mocked(db.prepare).mockReturnValue({
        get: vi.fn().mockReturnValueOnce(existingUser),
      } as any);

      await createUser(mockContext);

      expect(mockContext.json).toHaveBeenCalledWith(
        { error: 'Username already exists' },
        400
      );
    });

    it('should handle errors during user creation', async () => {
      const newUser: User = {
        id: 1,
        username: 'newuser',
        password: 'newpass',
        image: 'newimg',
        membership: 'gold',
      };

      vi.mocked(mockContext.req.json).mockResolvedValueOnce(newUser);
      vi.mocked(db.prepare).mockImplementation(() => {
        throw new Error('Database error');
      });

      await createUser(mockContext);

      expect(mockContext.json).toHaveBeenCalledWith(
        { error: 'Internal Server Error. Unable to create user.' },
        500
      );
    });
  });
});
