const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect, admin } = require('../middleware/auth.middleware')

const {
  createCertification,
  getAllCertifications,
  getCertificationById,
  updateCertification,
  deleteCertification
} = require('../controller/certification.controller');

router.post('/',protect, admin, upload.array('media', 5), createCertification);
router.put('/:id',protect, admin, upload.array('media', 5), updateCertification);
router.delete('/:id',protect, admin, deleteCertification);

router.get('/', getAllCertifications);
router.get('/:id', getCertificationById);

module.exports = router;
