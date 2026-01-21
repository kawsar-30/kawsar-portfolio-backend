const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect, admin } = require('../middleware/auth.middleware')
const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} = require('../controller/service.controller');

// Admin routes
router.post('/',protect, admin, upload.array('media', 10), createService);
router.put('/:id',protect, admin, upload.array('media', 10), updateService);
router.delete('/:id',protect, admin, deleteService);

// Public routes
router.get('/', getAllServices);
router.get('/:id', getServiceById);

module.exports = router;
