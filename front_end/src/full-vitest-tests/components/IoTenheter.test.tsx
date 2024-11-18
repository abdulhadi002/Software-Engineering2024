import { render } from '@testing-library/react';
import { expect, vi } from 'vitest';
import IoTenheter from '../../components/IoTenheter';

describe('IoTenheter Component', () => {
  const mockDevices = [
    {
      id: 1,
      device_name: 'Test Device 1',
      device_status: true,
      device_version: 'v1.0',
      device_description: 'Description 1',
      device_image: 'test-image-1.jpg',
      user_id: 123,
    },
    {
      id: 2,
      device_name: 'Test Device 2',
      device_status: false,
      device_version: 'v2.0',
      device_description: 'Description 2',
      device_image: 'test-image-2.jpg',
      user_id: 456,
    },
  ];

  const mockOnAddDevice = vi.fn();
  const mockOnDeleteDevice = vi.fn();

  it('renders correctly with props', () => {
    const { getByText } = render(
      <IoTenheter
        devices={mockDevices}
        onAddDevice={mockOnAddDevice}
        onDeleteDevice={mockOnDeleteDevice}
      />
    );

    expect(getByText('Test Device 1')).toBeInTheDocument();
    expect(getByText('Test Device 2')).toBeInTheDocument();
  });

  it('calls onAddDevice when adding a device', () => {
    const { getByRole } = render(
      <IoTenheter
        devices={mockDevices}
        onAddDevice={mockOnAddDevice}
        onDeleteDevice={mockOnDeleteDevice}
      />
    );

    const addButton = getByRole('button', { name: /Add Device/i });
    addButton.click();

    expect(mockOnAddDevice).toHaveBeenCalled();
  });

  it('calls onDeleteDevice when deleting a device', () => {
    const { getByRole } = render(
      <IoTenheter
        devices={mockDevices}
        onAddDevice={mockOnAddDevice}
        onDeleteDevice={mockOnDeleteDevice}
      />
    );

    const deleteButton = getByRole('button', { name: /Delete Device/i });
    deleteButton.click();

    expect(mockOnDeleteDevice).toHaveBeenCalled();
  });
});
