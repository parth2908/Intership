const express = require('express');
require('dotenv').config();
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');

// dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// User-related routes (Register, Login, Profile)
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
