const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = db.prepare(`
    SELECT * FROM users WHERE username = ? AND password = ?
  `).get(username, password);

  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/api/users', (req, res) => {
  const users = db.prepare('SELECT id, username FROM users').all();
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const { username, password } = req.body;
  try {
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, password);
    res.status(201).json({ success: true, message: 'User added' });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Username already exists' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});