const express = require('express');
const router = express.Router();
const { trackVisitor, getAllVisitors } = require('../controller/visitor.controller');
const { protect, admin } = require('../middleware/auth.middleware')

// Public route: track visitor automatically
router.post('/', trackVisitor);

// Admin route: get all visitor records
router.get('/', protect, admin, getAllVisitors);

module.exports = router;
