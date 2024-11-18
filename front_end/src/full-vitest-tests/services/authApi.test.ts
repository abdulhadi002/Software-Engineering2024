import { expect } from 'vitest';
import { login } from '../../../api';

describe('authApi Service', () => {
  it('logs in correctly', async () => {
    const result = await login({ username: 'admin', password: 'admin' });
    expect(result).toBeDefined();
  });
});
