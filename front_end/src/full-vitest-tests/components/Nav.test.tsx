import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Nav from '../../components/Nav';

describe('Nav Component', () => {
  const mockOnLogout = vi.fn();

  it('renders correctly', () => {
    render(<Nav onLogout={mockOnLogout} />);

    const logoutButton = screen.getByRole('button', { name: /Logout/i });
    expect(logoutButton).toBeInTheDocument();
  });

  it('calls onLogout when the logout button is clicked', async () => {
    render(<Nav onLogout={mockOnLogout} />);

    const logoutButton = screen.getByRole('button', { name: /Logout/i });
    await userEvent.click(logoutButton);

    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });
});
