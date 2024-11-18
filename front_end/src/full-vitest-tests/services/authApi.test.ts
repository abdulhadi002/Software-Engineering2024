
import { login } from '../../services/authApi';

describe('authApi Service', () => {
  it('logs in correctly', async () => {
    const result = await login('testuser', 'password123');
    expect(result).toBeDefined();
  });
});
