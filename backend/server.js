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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});