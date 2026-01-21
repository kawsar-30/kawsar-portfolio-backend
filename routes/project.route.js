const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect, admin } = require('../middleware/auth.middleware')

const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require('../controller/project.controller');

router.post('/',protect,admin, upload.array('media', 10), createProject);
router.put('/:id',protect,admin, upload.array('media', 10), updateProject);
router.delete('/:id',protect,admin, deleteProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

module.exports = router;