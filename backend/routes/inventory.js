const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const items = db.prepare('SELECT * FROM inventory').all();
  res.json(items);
});

router.post('/', (req, res) => {
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

router.post('/:id/update', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.prepare('DELETE FROM inventory WHERE id = ?').run(id);
  db.prepare('DELETE FROM inventory_history WHERE inventory_id = ?').run(id);

  res.json({ success: true, message: 'Item deleted' });
});

router.get('/:id/history', (req, res) => {
  const id = req.params.id;

  const history = db.prepare(`
    SELECT * FROM inventory_history WHERE inventory_id = ? ORDER BY timestamp DESC
  `).all(id);

  res.json(history);
});

module.exports = router;
