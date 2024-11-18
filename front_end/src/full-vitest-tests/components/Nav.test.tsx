import { render } from '@testing-library/react';
import { expect, vi } from 'vitest';
import Nav from '../../components/Nav';

describe('Nav Component', () => {
  const mockOnLogout = vi.fn();

  it('renders correctly', () => {
    const { getByRole } = render(<Nav onLogout={mockOnLogout} />);

    expect(getByRole('button', { name: /Logout/i })).toBeInTheDocument();
  });

  it('calls onLogout when logout button is clicked', () => {
    const { getByRole } = render(<Nav onLogout={mockOnLogout} />);

    const logoutButton = getByRole('button', { name: /Logout/i });
    logoutButton.click();

    expect(mockOnLogout).toHaveBeenCalled();
  });
});
