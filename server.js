const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// eslint-disable-next-line no-undef
const logFilePath = path.join(__dirname, './app.log');

app.post('/log', (req, res) => {
  const logEntry = req.body;
  if (!logEntry) {
    return res.status(400).json({ error: 'No log entry provided' });
  }
  const logEntryJson = JSON.stringify(logEntry) + '\n';
  fs.appendFile(logFilePath, logEntryJson, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to write log' });
    }
    res.status(200).json({ message: 'Log written successfully' });
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${port}`);
});
