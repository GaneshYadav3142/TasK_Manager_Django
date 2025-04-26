const { getDB } = require('../config/db');

const createUser = (username, hashedPassword, callback) => {
  const db = getDB();
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], callback);
};

const findUserByUsername = (username, callback) => {
  const db = getDB();
  db.get('SELECT * FROM users WHERE username = ?', [username], callback);
};

module.exports = { createUser, findUserByUsername };
