const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const users = db.prepare('SELECT id, username, role FROM users').all();
  res.json(users);
});

router.post('/', (req, res) => {
  const { username, password, role } = req.body;

  try {
    db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)')
      .run(username, password, role || 'staff');
    res.status(201).json({ success: true, message: 'User added' });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Username already exists' });
  }
});

module.exports = router;
