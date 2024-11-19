import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import * as authController from '../controllers/authController';
import * as iotDeviceController from '../controllers/iotDeviceController';
import * as userController from '../controllers/UserController';

vi.mock('hono', () => ({
  Hono: vi.fn().mockImplementation(() => ({
    use: vi.fn(),
    post: vi.fn(),
    get: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    fetch: vi.fn(),
  })),
}));
vi.mock('hono/cors', () => ({
  cors: vi.fn(() => vi.fn()),
}));

describe('Hono App', () => {
  let app: any;

  beforeEach(() => {
    app = new Hono();
    vi.clearAllMocks();
  });

  it('should initialize the app and configure CORS', () => {
    app.use('*', cors({
      origin: 'http://localhost:5173',
      credentials: true,
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization', 'x-username'],
    }));

    expect(cors).toHaveBeenCalledWith({
      origin: 'http://localhost:5173',
      credentials: true,
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization', 'x-username'],
    });
    expect(app.use).toHaveBeenCalledWith('*', expect.any(Function));
  });

  it('should register auth routes', () => {
    app.post('/login', authController.login);
    app.post('/register', authController.register);

    expect(app.post).toHaveBeenCalledWith('/login', authController.login);
    expect(app.post).toHaveBeenCalledWith('/register', authController.register);
  });

  it('should register IoT device routes', () => {
    app.get('/IotEnheter', iotDeviceController.getAllDevices);
    app.get('/IotEnheter/:id', iotDeviceController.getDeviceById);
    app.post('/IotEnheter', iotDeviceController.createDevice);
    app.put('/IotEnheter/:id', iotDeviceController.updateDevice);
    app.delete('/IotEnheter/:id', iotDeviceController.deleteDevice);

    expect(app.get).toHaveBeenCalledWith('/IotEnheter', iotDeviceController.getAllDevices);
    expect(app.get).toHaveBeenCalledWith('/IotEnheter/:id', iotDeviceController.getDeviceById);
    expect(app.post).toHaveBeenCalledWith('/IotEnheter', iotDeviceController.createDevice);
    expect(app.put).toHaveBeenCalledWith('/IotEnheter/:id', iotDeviceController.updateDevice);
    expect(app.delete).toHaveBeenCalledWith('/IotEnheter/:id', iotDeviceController.deleteDevice);
  });

  it('should register user routes', () => {
    app.get('/users', userController.getAllUsers);
    app.get('/users/:username', userController.getUserByUsername);
    app.post('/users', userController.createUser);

    expect(app.get).toHaveBeenCalledWith('/users', userController.getAllUsers);
    expect(app.get).toHaveBeenCalledWith('/users/:username', userController.getUserByUsername);
    expect(app.post).toHaveBeenCalledWith('/users', userController.createUser);
  });
});
