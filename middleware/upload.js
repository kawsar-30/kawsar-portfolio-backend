// const multer = require('multer');

// // 🔧 FIX: explicit limits + fileFilter
// const storage = multer.memoryStorage();

// const upload = multer({
//   storage,
//   limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
// });

// module.exports = upload;

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
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

module.exports = upload;
