const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
const { initDB } = require('./config/db');

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

// Routes
app.use('/', authRoutes);


initDB();

// Start server
app.listen(PORT, () => {
  console.log(`Node Backend running on http://localhost:${PORT}`);
});
