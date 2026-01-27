const cloudinary = require('cloudinary').v2;
const config = require('../config/config');

// 🔧 FIX: ensure config is loaded properly
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret
});

// 🔧 FIX: safer & universal upload function
const uploadMedia = async (file, folder = 'projects') => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto', 
      },
      (error, result) => {
        if (error) return reject(error);

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          mediaType: result.resource_type === 'raw' ? 'pdf' : result.resource_type,
          originalName: file.originalname
        });
      }
    ).end(file.buffer);
  });
};

module.exports = { uploadMedia };
