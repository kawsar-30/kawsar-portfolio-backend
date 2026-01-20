const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

const {
  createCertification,
  getAllCertifications,
  getCertificationById,
  updateCertification,
  deleteCertification
} = require('../controller/certification.controller');

router.post('/', upload.array('media', 5), createCertification);
router.put('/:id', upload.array('media', 5), updateCertification);
router.delete('/:id', deleteCertification);

// 🔧🔥 ORDER MATTERS
router.get('/', getAllCertifications);
router.get('/:id', getCertificationById);

module.exports = router;
