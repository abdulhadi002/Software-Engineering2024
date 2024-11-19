
import { renderHook } from '@testing-library/react';
import useDevices from '../../hooks/useDevices';
import { expect } from 'vitest';

describe('useDevices Hook', () => {
  it('initializes correctly', () => {
    const { result } = renderHook(() => useDevices());
    expect(result.current).toBeDefined();
  });
});
