
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { readFile, writeFile } from "node:fs/promises";
import { serveStatic } from "@hono/node-server/serve-static";
import { cors } from "hono/cors";


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
=======
app.use("/*", cors());

app.use("/statics/*", serveStatic({ root: "./" }));

app.get("/json", async (c) => {
  const get_device = await readFile("./backend/src/data.json", "utf-8");
  return c.json(JSON.parse(get_device));
});

app.post("/json", async (c) => {
  try {
    const newDevice = await c.req.json();
    const post_device = await readFile("./backend/src/data.json", "utf-8");
    const devices = JSON.parse(post_device).devices;

    newDevice.id = devices.length ? devices[devices.length - 1].id + 1 : 1;
    devices.push(newDevice);

    await writeFile("./backend/src/data.json", JSON.stringify({ devices: devices }, null, 2));

    return c.json(newDevice, 200);
  } catch (error) {
    return c.text("Failed to save device", 500);
  }
});

app.post('/login', async (c) => {
  try {
    const credentials = await c.req.json();
    const data = await readFile('./backend/src/PersonData.json', 'utf-8');
    const users = JSON.parse(data);
    const isValidUser = users.some((user: { userName: any; password: any; }) => user.userName === credentials.userName && user.password === credentials.password);
    if (isValidUser) {
      return c.json({ success: true });
    } else {
      return c.json({ success: false }, 401);
    }
  } catch (error) {
    return c.text('Error while checking user credentials', 500);
  }
});

app.post('/register', async (c) => {
  try {
    const newUser = await c.req.json();
    const data = await readFile('./backend/src/PersonData.json', 'utf-8');
    const users = JSON.parse(data);
    users.push(newUser);
    await writeFile('./backend/src/PersonData.json', JSON.stringify(users, null, 2));
    return c.json({ success: true });
  } catch (error) {
    return c.text('Error while registering user', 500);
  }
});

app.get('/profile', async (c) => {
  try {
    const data = await readFile('./backend/src/PersonData.json', 'utf-8');
    const users = JSON.parse(data);
    const profileData = users[0];
    return c.json(profileData);
  } catch (error) {
    return c.text('Error fetching profile data', 500);
  }
});


app.put('/profile', async (c) => {
  try {
    const { password } = await c.req.json();
    const data = await readFile('./backend/src/PersonData.json', 'utf-8');
    const users = JSON.parse(data);
    users[0] = { ...users[0], password };
    await writeFile('./backend/src/PersonData.json', JSON.stringify(users, null, 2));
    return c.json({ success: true });
  } catch (error) {
    return c.text('Error updating profile password', 500);
  }
});

const port = 6969
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
});
