const Service = require('../model/service.model');
const { uploadMedia } = require('../service/cloudinary.service');

// CREATE SERVICE
exports.createService = async (req, res, next) => {
  try {
    const { title, description, category, featured } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Service icon is required' });
    }

    
    const iconData = await uploadMedia(req.file, 'services');

    const service = await Service.create({
      title,
      description,
      category,
      featured: String(featured) === 'true',
      media: iconData 
    });

    res.status(201).json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

// GET ALL SERVICES
exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ success: true, data: services });
  } catch (err) {
    next(err);
  }
};

// GET SINGLE SERVICE
exports.getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

// UPDATE SERVICE
exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });

    if (req.file) {
      // Notun file thakle services folder-e upload hobe
      const iconData = await uploadMedia(req.file, 'services');
      service.media = iconData;
    }

    service.title = req.body.title || service.title;
    service.description = req.body.description || service.description;
    service.category = req.body.category || service.category;
    
    if (req.body.featured !== undefined) {
      service.featured = String(req.body.featured) === 'true';
    }

    await service.save();
    res.json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

// DELETE SERVICE
exports.deleteService = async (req, res, next) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Service deleted' });
  } catch (err) {
    next(err);
  }
};