const Certification = require('../model/certification.model');
const { uploadMedia } = require('../service/cloudinary.service');

// CREATE CERTIFICATION
exports.createCertification = async (req, res, next) => {
  try {
    const { title, issuer, issueDate, credentialUrl, featured } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    // 🔧🔥 FIX boolean handling
    const featuredValue =
      featured === 'true' || featured === true ? true : false;

    const mediaFiles = [];

    if (req.files?.length) {
      for (const file of req.files) {
        const uploaded = await uploadMedia(file, 'certifications');
        mediaFiles.push(uploaded);
      }
    }

    const cert = await Certification.create({
      title,
      issuer,
      issueDate,
      credentialUrl,
      featured: featuredValue, // 🔥 FIX
      media: mediaFiles
    });

    res.status(201).json({ success: true, data: cert });
  } catch (err) {
    next(err);
  }
};

// GET ALL
exports.getAllCertifications = async (req, res, next) => {
  try {
    const certs = await Certification.find().sort({ createdAt: -1 });
    res.json({ success: true, data: certs });
  } catch (err) {
    next(err);
  }
};

// GET SINGLE
exports.getCertificationById = async (req, res, next) => {
  try {
    const cert = await Certification.findById(req.params.id);
    if (!cert) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found'
      });
    }
    res.json({ success: true, data: cert });
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updateCertification = async (req, res, next) => {
  try {
    const cert = await Certification.findById(req.params.id);
    if (!cert) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found'
      });
    }

    const mediaFiles = cert.media;

    if (req.files?.length) {
      for (const file of req.files) {
        const uploaded = await uploadMedia(file, 'certifications');
        mediaFiles.push(uploaded);
      }
    }

    cert.title = req.body.title || cert.title;
    cert.issuer = req.body.issuer || cert.issuer;
    cert.issueDate = req.body.issueDate || cert.issueDate;
    cert.credentialUrl = req.body.credentialUrl || cert.credentialUrl;
    cert.featured =
      req.body.featured === 'true' || req.body.featured === true
        ? true
        : cert.featured;
    cert.media = mediaFiles;

    await cert.save();

    res.json({ success: true, data: cert });
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.deleteCertification = async (req, res, next) => {
  try {
    await Certification.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Certification deleted' });
  } catch (err) {
    next(err);
  }
};
