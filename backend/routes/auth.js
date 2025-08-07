const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = db.prepare(`
    SELECT * FROM users WHERE username = ? AND password = ?
  `).get(username, password);

  if (user) {
    res.json({ success: true, role: user.role, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

module.exports = router;
