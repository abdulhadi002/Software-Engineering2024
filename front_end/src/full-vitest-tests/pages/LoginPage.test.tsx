import { render } from '@testing-library/react';
import LoginPage from '../../pages/LoginPage';
import { vi, describe, it, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import * as reactRouterDom from 'react-router-dom';

vi.mock('../../api', () => ({
  login: vi.fn(),
  register: vi.fn(),
}));

const mockNavigate = vi.fn();

vi.spyOn(reactRouterDom, 'useNavigate').mockReturnValue(mockNavigate);

describe('LoginPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    const mockOnLogin = vi.fn();
    render(
      <BrowserRouter>
        <LoginPage onLogin={mockOnLogin} />
      </BrowserRouter>
    );
  });
});
