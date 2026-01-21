const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect, admin } = require('../middleware/auth.middleware')

const {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill
} = require('../controller/skill.controller');

// Admin routes
router.post('/',protect, admin, upload.single('icon'), createSkill);
router.put('/:id',protect, admin, upload.single('icon'), updateSkill);
router.delete('/:id',protect, admin, deleteSkill);

// Public routes
router.get('/', getAllSkills);
router.get('/:id', getSkillById);

module.exports = router;
