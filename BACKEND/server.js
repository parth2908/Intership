const express = require('express');
require('dotenv').config();
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const cors = require('cors');
const path = require('path');


// dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(cors({
  origin: 'http://localhost:5173',
  
}));
// User-related routes (Register, Login, Profile)
// app.use('src/uploads', express.static(path.join(__dirname, 'src/uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
