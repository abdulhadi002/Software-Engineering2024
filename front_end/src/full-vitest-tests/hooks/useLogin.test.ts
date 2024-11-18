import { renderHook } from '@testing-library/react';
import { expect, vi } from 'vitest';
import useLogin from '../../hooks/useLogin';

describe('useLogin Hook', () => {
  const mockCheckUserCredentials = vi.fn();
  const mockRegisterUser = vi.fn();

  it('initializes correctly', () => {
    const { result } = renderHook(() =>
      useLogin(mockCheckUserCredentials, mockRegisterUser)
    );

    expect(result.current.credentials).toEqual({ username: '', password: '' });
    expect(result.current.handleChange).toBeInstanceOf(Function);
    expect(result.current.handleSubmit).toBeInstanceOf(Function);
    expect(result.current.isRegistering).toBe(false);
    expect(result.current.setIsRegistering).toBeInstanceOf(Function);
    expect(result.current.message).toBe('');
  });
});
