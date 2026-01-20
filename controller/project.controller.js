const Project = require('../model/project.model');
const { uploadMedia } = require('../service/cloudinary.service');

// CREATE PROJECT
exports.createProject = async (req, res, next) => {
  try {
    const { title, description, category, featured } = req.body;
    console.log(title,description,category,featured)

    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' }); // 🔧 FIX
    }

    const mediaFiles = [];

    if (req.files?.length) {
      for (const file of req.files) {
        const uploaded = await uploadMedia(file, 'projects'); // 🔧 FIX: folder explicit
        mediaFiles.push(uploaded);
      }
    }

    const project = await Project.create({
      title,
      description,
      category,
      featured,
      media: mediaFiles
    });

    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// GET ALL PROJECTS
exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
};

// GET SINGLE PROJECT
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// UPDATE PROJECT
exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const mediaFiles = project.media;

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await uploadMedia(file);
        mediaFiles.push(uploaded);
      }
    }

    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.category = req.body.category || project.category;
    project.featured = req.body.featured ?? project.featured;
    project.media = mediaFiles;

    await project.save();

    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// DELETE PROJECT
exports.deleteProject = async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};
