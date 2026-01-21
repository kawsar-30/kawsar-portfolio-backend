const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/auth.controller');

// Admin registration (optional)
router.post('/register', register);

// Admin login
router.post('/login', login);

module.exports = router;
