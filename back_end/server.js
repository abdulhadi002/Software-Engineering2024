const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());

// Filsti til JSON-filen
const FILE_PATH = path.join(__dirname, 'devices.json');

// Hente alle enheter (GET /devices)
app.get('/devices', (req, res) => {
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Could not read file' });
    }
    const devices = JSON.parse(data);
    res.status(200).json(devices);
  });
});

// Legge til en ny enhet (POST /devices)
app.post('/devices', (req, res) => {
  const newDevice = req.body;

  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Could not read file' });
    }
    const devices = JSON.parse(data);
    devices.push(newDevice);

    fs.writeFile(FILE_PATH, JSON.stringify(devices, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Could not write file' });
      }
      res.status(201).json(newDevice);
    });
  });
});

// Slette en enhet (DELETE /devices/:id)
app.delete('/devices/:index', (req, res) => {
  const index = parseInt(req.params.index);

  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Could not read file' });
    }
    let devices = JSON.parse(data);
    if (index >= devices.length || index < 0) {
      return res.status(400).json({ error: 'Invalid index' });
    }

    devices = devices.filter((_, i) => i !== index);

    fs.writeFile(FILE_PATH, JSON.stringify(devices, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Could not write file' });
      }
      res.status(200).send(`Device at index ${index} deleted.`);
    });
  });
});

// Start serveren
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
