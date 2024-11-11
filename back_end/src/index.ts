import express from 'express';
import cors from 'cors';

import authRoutes from './controllers/authController';
import iotDeviceRoutes from './controllers/iotDeviceController';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/IotEnheter', iotDeviceRoutes);

const port = 6969;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
