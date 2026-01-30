const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect, admin } = require('../middleware/auth.middleware');
const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} = require('../controller/service.controller');

// Admin routes

router.post('/', protect, admin, upload.single('media'), createService);
router.put('/:id', protect, admin, upload.single('media'), updateService);
router.delete('/:id', protect, admin, deleteService);

// Public routes
router.get('/', getAllServices);
router.get('/:id', getServiceById);

module.exports = router;