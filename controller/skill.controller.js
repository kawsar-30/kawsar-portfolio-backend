const Skill = require('../model/skill.model');
const { uploadMedia } = require('../service/cloudinary.service');

// CREATE SKILL
exports.createSkill = async (req, res, next) => {
  try {
    const { name, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Skill icon is required' });
    }

    const iconData = await uploadMedia(req.file, 'skills');

    const skill = await Skill.create({
      name,
      category,
      icon: iconData
    });

    res.status(201).json({ success: true, data: skill });
  } catch (err) {
    next(err);
  }
};

// GET ALL SKILLS
exports.getAllSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json({ success: true, data: skills });
  } catch (err) {
    next(err);
  }
};

// GET SINGLE SKILL
exports.getSkillById = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, data: skill });
  } catch (err) {
    next(err);
  }
};

// UPDATE SKILL
exports.updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });

    if (req.file) {
      const iconData = await uploadMedia(req.file, 'skills');
      skill.icon = iconData;
    }

    skill.name = req.body.name || skill.name;
    skill.category = req.body.category || skill.category;

    await skill.save();

    res.json({ success: true, data: skill });
  } catch (err) {
    next(err);
  }
};

// DELETE SKILL
exports.deleteSkill = async (req, res, next) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Skill deleted' });
  } catch (err) {
    next(err);
  }
};
