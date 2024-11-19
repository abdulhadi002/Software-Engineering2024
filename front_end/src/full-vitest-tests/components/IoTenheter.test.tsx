import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with props', () => {
    render(
      <IoTenheter
        devices={mockDevices}
        onAddDevice={mockOnAddDevice}
        onDeleteDevice={mockOnDeleteDevice}
      />
    );

    expect(screen.getByText('Test Device 1')).toBeInTheDocument();
    expect(screen.getByText('Test Device 2')).toBeInTheDocument();
  });

  it('calls onAddDevice when adding a device', async () => {
    render(
      <IoTenheter
        devices={mockDevices}
        onAddDevice={mockOnAddDevice}
        onDeleteDevice={mockOnDeleteDevice}
      />
    );

    const addButton = screen.getByRole('button', { name: /Add Device/i });
    await userEvent.click(addButton);

    expect(mockOnAddDevice).toHaveBeenCalledTimes(1);
  });

  it('calls onDeleteDevice when deleting a device', async () => {
    render(
      <IoTenheter
        devices={mockDevices}
        onAddDevice={mockOnAddDevice}
        onDeleteDevice={mockOnDeleteDevice}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /Delete Test Device 1/i });
    await userEvent.click(deleteButton);

    expect(mockOnDeleteDevice).toHaveBeenCalledWith(1);
  });
});
