const Database = require('better-sqlite3');
const db = new Database('database.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`).run();

db.prepare(`INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)`).run('admin', 'admin123');

module.exports = db;
