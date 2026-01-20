const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require('../controller/project.controller');

router.post('/', upload.array('media', 10), createProject);
router.put('/:id', upload.array('media', 10), updateProject);
router.delete('/:id', deleteProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

module.exports = router;