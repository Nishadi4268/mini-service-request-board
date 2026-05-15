const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.AUTH_EMAIL || 'admin@globaltna.com';
  const adminPassword = process.env.AUTH_PASSWORD || 'Admin@123';

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  const token = jwt.sign(
    { email: adminEmail, role: 'admin' },
    process.env.JWT_SECRET || 'dev_secret_change_me',
    { expiresIn: '2h' }
  );

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: {
        email: adminEmail,
        role: 'admin'
      }
    }
  });
});

module.exports = router;
