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
    res.json({ success: true, role: user.role, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/api/users', (req, res) => {
  const users = db.prepare('SELECT id, username, role FROM users').all();
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const { username, password, role } = req.body;

  try {
    db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)')
      .run(username, password, role || 'staff');
    res.status(201).json({ success: true, message: 'User added' });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Username already exists' });
  }
});

app.get('/api/inventory', (req, res) => {
  const items = db.prepare('SELECT * FROM inventory').all();
  res.json(items);
});

app.post('/api/inventory', (req, res) => {
  const { name, quantity, type, price } = req.body;

  const result = db.prepare(`
    INSERT INTO inventory (name, quantity, type, price)
    VALUES (?, ?, ?, ?)
  `).run(name, quantity, type, price);

  db.prepare(`
    INSERT INTO inventory_history (inventory_id, action, quantity, note)
    VALUES (?, 'added', ?, ?)
  `).run(result.lastInsertRowid, quantity, `Initial stock`);

  res.status(201).json({ success: true, message: 'Item added' });
});

app.post('/api/inventory/:id/update', (req, res) => {
  const id = req.params.id;
  const { quantityChange, note = '' } = req.body;

  db.prepare(`
    UPDATE inventory SET quantity = quantity + ? WHERE id = ?
  `).run(quantityChange, id);

  db.prepare(`
    INSERT INTO inventory_history (inventory_id, action, quantity, note)
    VALUES (?, 'mutated', ?, ?)
  `).run(id, quantityChange, note);

  res.json({ success: true, message: 'Inventory updated' });
});

app.delete('/api/inventory/:id', (req, res) => {
  const id = req.params.id;

  db.prepare('DELETE FROM inventory WHERE id = ?').run(id);
  db.prepare('DELETE FROM inventory_history WHERE inventory_id = ?').run(id);

  res.json({ success: true, message: 'Item deleted' });
});

app.get('/api/inventory/:id/history', (req, res) => {
  const id = req.params.id;

  const history = db.prepare(`
    SELECT * FROM inventory_history WHERE inventory_id = ? ORDER BY timestamp DESC
  `).all(id);

  res.json(history);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});