const jwt = require('jsonwebtoken');  //verify token


//user is authenticate or not
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // verify the token expired or not 
    req.user = decoded; // { id: ... }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });  //if token verification failed 
  }
};

module.exports = auth;
