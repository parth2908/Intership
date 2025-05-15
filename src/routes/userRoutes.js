const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); //Library to hash and compare passwords securely.
const jwt = require('jsonwebtoken'); //enerate and verify JSON Web Token
const User = require('../models/user');
const auth = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }); // search in database 
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password); //verify passsword and return boolean if match then true otherwise false
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); //excludes paasword field in result
    res.json(user); // send and found data 
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
