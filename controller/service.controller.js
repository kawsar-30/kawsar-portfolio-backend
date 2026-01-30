const Service = require('../model/service.model');
const { uploadMedia } = require('../service/cloudinary.service');

// CREATE SERVICE
exports.createService = async (req,res,next) => {
  try{
    const { title, description, category, featured } = req.body;
    const mediaFiles = [];

    if(req.files && req.files.length > 0){
      for(const file of req.files){
        const uploaded = await uploadMedia(file);
        mediaFiles.push(uploaded);
      }
    }

    const service = await Service.create({
      title,
      description,
      category,
      featured,
      media: mediaFiles
    });

    res.status(201).json({ success: true, data: service });
  }catch(err){
    next(err);
  }
}

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

    // Handle Media: Jodi notun file thake sheta use hobe, nahole agerটাই thakbe
    let mediaFiles = service.media; 
    if (req.files && req.files.length > 0) {
      const uploadedFiles = [];
      for (const file of req.files) {
        const uploaded = await uploadMedia(file);
        uploadedFiles.push(uploaded);
      }
      mediaFiles = uploadedFiles; // Old media replaced by new one
    } else if (req.body.media) {
      // Manual object pass korle sheta update hobe
      mediaFiles = Array.isArray(req.body.media) ? req.body.media : [req.body.media];
    }

    // Explicitly update fields
    service.title = req.body.title || service.title;
    service.description = req.body.description || service.description;
    service.category = req.body.category || service.category;

    // Featured Fix: Frontend theke asha string/boolean ke properly handle kora
    if (req.body.featured !== undefined) {
      service.featured = String(req.body.featured) === 'true';
    }

    service.media = mediaFiles;

    const updatedService = await service.save();
    res.json({ success: true, data: updatedService });
  } catch (err) {
    next(err);
  }
}

// DELETE SERVICE
exports.deleteService = async (req,res,next) => {
  try{
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success:true, message:'Service deleted' });
  }catch(err){
    next(err);
  }
}
