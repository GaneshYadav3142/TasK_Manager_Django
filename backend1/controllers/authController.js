const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByUsername } = require('../models/User');

const JWT_SECRET = 'jwt_secret_key'; 

exports.register = (req, res) => {
  const { username, password } = req.body;

  console.log('Registering user:', username)
  if (!username || !password) return res.status(400).json({ message: 'Username and Password required' });

  findUserByUsername(username, (err, user) => {
    if (user) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = bcrypt.hashSync(password, 10);

    createUser(username, hashedPassword, (err) => {
      if (err) return res.status(500).json({ message: 'Error creating user' });

      return res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  console.log('Logging in user:', username)
  if (!username || !password) return res.status(400).json({ message: 'Username and Password required' });

  findUserByUsername(username, (err, user) => {
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    return res.json({ token });
  });
};

exports.home = (req, res) => {
 return res.json({ message: 'Welcome to the home page!' });
}