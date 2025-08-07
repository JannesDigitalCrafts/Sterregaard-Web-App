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

module.exports = db;
