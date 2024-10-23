import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

const filePath = path.resolve(__dirname, 'devices.json');

function readDevices() {
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error reading devices:', error.message);
        } else {
            console.error('An unknown error occurred while reading devices');
        }
        return [];
    }
}

function writeDevices(devices: any) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(devices, null, 2), 'utf-8');
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error writing devices:', error.message);
        } else {
            console.error('An unknown error occurred while writing devices');
        }
    }
}

app.get('/devices', (req, res) => {
    try {
        const devices = readDevices();
        res.json(devices);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching devices:', error.message);
        } else {
            console.error('An unknown error occurred while fetching devices');
        }
        res.status(500).json({ error: 'Internal Server Error. Unable to fetch devices.' });
    }
});

app.post('/devices', (req, res) => {
    try {
        const newDevice = req.body;
        if (!newDevice || !newDevice.name) {
            throw new Error('Invalid data format');
        }

        let devices = readDevices();
        devices.push(newDevice);
        writeDevices(devices);

        console.log('Adding new device:', newDevice);
        res.status(201).json(newDevice);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error while adding device:', error.message);
        } else {
            console.error('An unknown error occurred while adding device');
        }
        res.status(500).json({ error: 'Internal Server Error. Unable to add device.' });
    }
});

app.delete('/devices/:index', (req, res) => {
    try {
        const index = parseInt(req.params.index, 10);
        let devices = readDevices();

        if (isNaN(index) || index < 0 || index >= devices.length) {
            throw new Error('Invalid index');
        }

        devices.splice(index, 1);
        writeDevices(devices);

        console.log('Deleting device at index:', index);
        res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error while deleting device:', error.message);
        } else {
            console.error('An unknown error occurred while deleting device');
        }
        res.status(500).json({ error: 'Internal Server Error. Unable to delete device.' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
