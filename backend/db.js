const Database = require('better-sqlite3');
const db = new Database('database.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'staff'
  )
`).run();

db.prepare(`INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)`).run('admin', 'admin123', 'admin');

db.prepare(`
  CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    quantity REAL NOT NULL,
    type TEXT,
    price REAL
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS inventory_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    inventory_id INTEGER NOT NULL,
    action TEXT NOT NULL,
    quantity REAL NOT NULL,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    note TEXT,
    FOREIGN KEY (inventory_id) REFERENCES inventory(id)
  )
`).run();

module.exports = db;
