import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as iotDeviceService from '../service/iotDeviceService';
import { getCookie } from 'hono/cookie';
import {
  getAllDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
} from '../controllers/iotDeviceController';
import { Context } from 'hono';

vi.mock('../service/iotDeviceService', () => ({
  fetchDevicesByUserId: vi.fn(),
  fetchDeviceByIdAndUserId: vi.fn(),
  addDevice: vi.fn(),
  editDevice: vi.fn(),
  removeDevice: vi.fn(),
}));
vi.mock('hono/cookie', () => ({
  getCookie: vi.fn(),
}));

describe('IoT Device Controller', () => {
  let mockContext: Context;

  beforeEach(() => {
    mockContext = {
      req: {
        param: vi.fn(),
        json: vi.fn(),
      },
      json: vi.fn(),
      text: vi.fn(),
    } as unknown as Context;

    vi.clearAllMocks();
  });

  describe('getAllDevices', () => {
    it('should return devices for authorized user', () => {
      const mockDevices = [{ id: 1, name: 'Device 1' }];
      vi.mocked(getCookie).mockReturnValueOnce('123');
      vi.mocked(iotDeviceService.fetchDevicesByUserId).mockReturnValueOnce(mockDevices);

      getAllDevices(mockContext);

      expect(getCookie).toHaveBeenCalledWith(mockContext, 'user_id');
      expect(iotDeviceService.fetchDevicesByUserId).toHaveBeenCalledWith('123');
      expect(mockContext.json).toHaveBeenCalledWith(mockDevices);
    });

    it('should return 401 for unauthorized user', () => {
      vi.mocked(getCookie).mockReturnValueOnce(null);

      getAllDevices(mockContext);

      expect(mockContext.json).toHaveBeenCalledWith({ error: 'Unauthorized' }, 401);
    });
  });

  describe('getDeviceById', () => {
    it('should return a device for authorized user', () => {
      const mockDevice = { id: 1, name: 'Device 1' };
      vi.mocked(getCookie).mockReturnValueOnce('123');
      vi.mocked(mockContext.req.param).mockReturnValueOnce('1');
      vi.mocked(iotDeviceService.fetchDeviceByIdAndUserId).mockReturnValueOnce(mockDevice);

      getDeviceById(mockContext);

      expect(getCookie).toHaveBeenCalledWith(mockContext, 'user_id');
      expect(iotDeviceService.fetchDeviceByIdAndUserId).toHaveBeenCalledWith('1', '123');
      expect(mockContext.json).toHaveBeenCalledWith(mockDevice);
    });

    it('should return 404 if device is not found', () => {
      vi.mocked(getCookie).mockReturnValueOnce('123');
      vi.mocked(mockContext.req.param).mockReturnValueOnce('1');
      vi.mocked(iotDeviceService.fetchDeviceByIdAndUserId).mockReturnValueOnce(null);

      getDeviceById(mockContext);

      expect(mockContext.json).toHaveBeenCalledWith({ error: 'Device not found' }, 404);
    });

    it('should return 401 for unauthorized user', () => {
      vi.mocked(getCookie).mockReturnValueOnce(null);

      getDeviceById(mockContext);

      expect(mockContext.json).toHaveBeenCalledWith({ error: 'Unauthorized' }, 401);
    });
  });

  describe('createDevice', () => {
    it('should create a device for authorized user', async () => {
      const mockDevice = { name: 'New Device', device_status: 1 };
      vi.mocked(getCookie).mockReturnValueOnce('123');
      vi.mocked(mockContext.req.json).mockResolvedValueOnce(mockDevice);

      await createDevice(mockContext);

      expect(getCookie).toHaveBeenCalledWith(mockContext, 'user_id');
      expect(iotDeviceService.addDevice).toHaveBeenCalledWith({
        ...mockDevice,
        device_status: '1',
      });
      expect(mockContext.json).toHaveBeenCalledWith({ ...mockDevice, user_id: '123' }, 201);
    });

    it('should return 401 for unauthorized user', async () => {
      vi.mocked(getCookie).mockReturnValueOnce(null);

      await createDevice(mockContext);

      expect(mockContext.json).toHaveBeenCalledWith({ error: 'Unauthorized' }, 401);
    });
  });

  describe('updateDevice', () => {
    it('should update a device for authorized user', async () => {
      const mockUpdate = { name: 'Updated Device' };
      vi.mocked(getCookie).mockReturnValueOnce('123');
      vi.mocked(mockContext.req.param).mockReturnValueOnce('1');
      vi.mocked(mockContext.req.json).mockResolvedValueOnce(mockUpdate);
      vi.mocked(iotDeviceService.editDevice).mockReturnValueOnce(true);

      await updateDevice(mockContext);

      expect(iotDeviceService.editDevice).toHaveBeenCalledWith('1', '123', mockUpdate);
      expect(mockContext.json).toHaveBeenCalledWith({ message: 'Device updated successfully' });
    });

    it('should return 404 if device is not found', async () => {
      vi.mocked(getCookie).mockReturnValueOnce('123');
      vi.mocked(mockContext.req.param).mockReturnValueOnce('1');
      vi.mocked(mockContext.req.json).mockResolvedValueOnce({});
      vi.mocked(iotDeviceService.editDevice).mockReturnValueOnce(false);

      await updateDevice(mockContext);

      expect(mockContext.json).toHaveBeenCalledWith({ error: 'Device not found or unauthorized' }, 404);
    });
  });

  describe('deleteDevice', () => {
    it('should delete a device for authorized user', () => {
      vi.mocked(getCookie).mockReturnValueOnce('123');
      vi.mocked(mockContext.req.param).mockReturnValueOnce('1');
      vi.mocked(iotDeviceService.removeDevice).mockReturnValueOnce(true);

      deleteDevice(mockContext);

      expect(mockContext.text).toHaveBeenCalledWith('', 204);
    });

    it('should return 404 if device is not found', () => {
      vi.mocked(getCookie).mockReturnValueOnce('123');
      vi.mocked(mockContext.req.param).mockReturnValueOnce('1');
      vi.mocked(iotDeviceService.removeDevice).mockReturnValueOnce(false);

      deleteDevice(mockContext);

      expect(mockContext.json).toHaveBeenCalledWith({ error: 'Device not found or unauthorized' }, 404);
    });
  });
});
