import { render } from '@testing-library/react';
import LoginPage from '../../pages/LoginPage';
import { vi } from 'vitest';

describe('LoginPage Component', () => {
  it('renders correctly', () => {
    const mockOnLogin = vi.fn();
    render(<LoginPage onLogin={mockOnLogin} />);
  });
});
