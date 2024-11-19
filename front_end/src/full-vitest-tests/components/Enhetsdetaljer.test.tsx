import { render } from '@testing-library/react';
import { expect, vi } from 'vitest';
import Enhetsdetaljer from '../../components/Enhetsdetaljer';

describe('Enhetsdetaljer Component', () => {
  const mockDeviceData = {
    id: 1,
    device_name: 'Test Device',
    device_status: true,
    device_version: 'v1.0',
    device_description: 'This is a test device.',
    device_image: 'test-image-url.jpg',
    user_id: 123,
  };

  const mockOnToggleStatus = vi.fn();

  it('renders correctly with props', () => {
    const { getByText } = render(
      <Enhetsdetaljer
        deviceData={mockDeviceData}
        onToggleStatus={mockOnToggleStatus}
      />
    );

    expect(getByText('Test Device')).toBeInTheDocument();
    expect(getByText('På')).toBeInTheDocument();
  });

  it('calls onToggleStatus when toggled', () => {
    const { getByRole } = render(
      <Enhetsdetaljer
        deviceData={mockDeviceData}
        onToggleStatus={mockOnToggleStatus}
      />
    );

    const toggleButton = getByRole('button', { name: /Slå av/i });
    toggleButton.click();

    expect(mockOnToggleStatus).toHaveBeenCalled();
  });
});
