

const multer = require('multer');

// 🔧🔥 MUST use memoryStorage for Cloudinary upload_stream
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/pdf'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('❌ Only image & PDF allowed'), false);
  }
};

const upload = multer({
  storage, // 🔥 FIX
  fileFilter,
  limits: {
    fileSize: 40 * 1024 * 1024 
  }
});

module.exports = upload;
