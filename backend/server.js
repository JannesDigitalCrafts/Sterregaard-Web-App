const express = require('express');
const db = require('./db');
const app = express();
const PORT = 3001;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = db.prepare(`SELECT * FROM users WHERE username = ? AND password = ?`).get(username, password);

  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
