
import { renderHook } from '@testing-library/react';
import useLogin from '../../hooks/useLogin';

describe('useLogin Hook', () => {
  const mockCheckUserCredentials = vi.fn();
  const mockRegisterUser = vi.fn();

  it('initializes correctly', () => {
    const { result } = renderHook(() =>
      useLogin(mockCheckUserCredentials, mockRegisterUser)
    );

    expect(result.current).toBeDefined();
    expect(result.current.login).toBeInstanceOf(Function);
    expect(result.current.register).toBeInstanceOf(Function);
  });
});
