import { describe, it, expect, vi, beforeEach } from 'vitest';
import { login, register } from '../controllers/authController';
import * as authService from '../service/authService';
import { Context } from 'hono';

vi.mock('../service/authService', () => ({
  authenticateUser: vi.fn(),
  registerUser: vi.fn(),
}));

describe('Auth Controller', () => {
  let mockContext: Context;

  beforeEach(() => {
    mockContext = {
      req: {
        json: vi.fn(),
      },
      json: vi.fn(),
      set: vi.fn(),
    } as unknown as Context;

    vi.clearAllMocks();
  });

  describe('login', () => {
    it('should set a cookie and return a success message if authentication succeeds', async () => {
      const mockAuthResult = {
        success: true as const,
        user: { id: 1, username: 'testuser' },
      };

      vi.mocked(authService.authenticateUser).mockResolvedValueOnce(mockAuthResult);

      vi.mocked(mockContext.req.json).mockResolvedValueOnce({
        username: 'testuser',
        password: 'password123',
      });

      await login(mockContext);

      expect(authService.authenticateUser).toHaveBeenCalledWith('testuser', 'password123');
      expect(mockContext.json).toHaveBeenCalledWith({ message: 'Innlogging vellykket' });
      expect(mockContext.set).toHaveBeenCalledWith(
        'Set-Cookie',
        expect.stringContaining('user_id=1')
      );
    });

    it('should return an error message if authentication fails', async () => {
      const mockAuthResult = {
        success: false as const,
        message: 'Invalid credentials',
      };

      vi.mocked(authService.authenticateUser).mockResolvedValueOnce(mockAuthResult);

      vi.mocked(mockContext.req.json).mockResolvedValueOnce({
        username: 'testuser',
        password: 'wrongpassword',
      });

      await login(mockContext);

      expect(authService.authenticateUser).toHaveBeenCalledWith('testuser', 'wrongpassword');
      expect(mockContext.json).toHaveBeenCalledWith({ message: 'Invalid credentials' }, 401);
    });
  });

  describe('register', () => {
    it('should set a cookie and return a success message if registration succeeds', async () => {
      const mockAuthResult = {
        success: true as const,
        user: { id: 1, username: 'newuser' },
      };

      vi.mocked(authService.registerUser).mockResolvedValueOnce(mockAuthResult);

      vi.mocked(mockContext.req.json).mockResolvedValueOnce({
        username: 'newuser',
        password: 'password123',
      });

      await register(mockContext);

      expect(authService.registerUser).toHaveBeenCalledWith('newuser', 'password123');
      expect(mockContext.json).toHaveBeenCalledWith({ message: 'Bruker registrert' }, 201);
      expect(mockContext.set).toHaveBeenCalledWith(
        'Set-Cookie',
        expect.stringContaining('user_id=1')
      );
    });

    it('should return an error message if registration fails', async () => {
      const mockAuthResult = {
        success: false as const,
        message: 'User already exists',
      };

      vi.mocked(authService.registerUser).mockResolvedValueOnce(mockAuthResult);

      vi.mocked(mockContext.req.json).mockResolvedValueOnce({
        username: 'existinguser',
        password: 'password123',
      });

      await register(mockContext);

      expect(authService.registerUser).toHaveBeenCalledWith('existinguser', 'password123');
      expect(mockContext.json).toHaveBeenCalledWith({ message: 'User already exists' }, 400);
    });
  });
});
