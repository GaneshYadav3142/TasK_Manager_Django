const sqlite3 = require('sqlite3').verbose();

let db;

function initDB() {
  db = new sqlite3.Database('./auth.db', (err) => {
    if (err) {
      console.error('Error opening DB:', err.message);
    } else {
      console.log('Connected to SQLite auth database.');

      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      )`);
    }
  });
}

function getDB() {
  return db;
}

module.exports = { initDB, getDB };
