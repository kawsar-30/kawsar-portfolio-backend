const Service = require('../model/service.model');
const { uploadMedia } = require('../service/cloudinary.service');

// CREATE SERVICE
exports.createService = async (req, res, next) => {
  try {
    const { title, description, category, featured } = req.body;
    const mediaFiles = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // 🔥 FIX: Passed 'services' folder name
        const uploaded = await uploadMedia(file, 'services');
        mediaFiles.push(uploaded);
      }
    }

    const service = await Service.create({
      title,
      description,
      category,
      featured: String(featured) === 'true', // 🔥 Boolean Fix
      media: mediaFiles
    });

    res.status(201).json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};


// GET ALL SERVICES
exports.getAllServices = async (req,res,next) => {
  try{
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ success:true, data: services });
  }catch(err){
    next(err);
  }
}

// GET SINGLE SERVICE
exports.getServiceById = async (req,res,next) => {
  try{
    const service = await Service.findById(req.params.id);
    if(!service) return res.status(404).json({ success:false, message:'Service not found' });
    res.json({ success:true, data: service });
  }catch(err){
    next(err);
  }
}

// UPDATE SERVICE
exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });

    let mediaFiles = service.media;

    if (req.files && req.files.length > 0) {
      const uploadedFiles = [];
      for (const file of req.files) {
        // 🔥 FIX: Ensure upload to 'services' folder
        const uploaded = await uploadMedia(file, 'services');
        uploadedFiles.push(uploaded);
      }
      mediaFiles = uploadedFiles; // Old icon replace hobe
    }

    service.title = req.body.title || service.title;
    service.description = req.body.description || service.description;
    service.category = req.body.category || service.category;
    
    if (req.body.featured !== undefined) {
      service.featured = String(req.body.featured) === 'true';
    }

    service.media = mediaFiles;
    await service.save();

    res.json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

// DELETE SERVICE
exports.deleteService = async (req,res,next) => {
  try{
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success:true, message:'Service deleted' });
  }catch(err){
    next(err);
  }
}
