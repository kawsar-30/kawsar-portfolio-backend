require('dotenv').config();

const config = {
  app: {
    port: process.env.PORT || 5000,
  },
  db: {
    url: process.env.DB_URL,
  },
  cloudinary: {
    cloud_name: process.env.CLOUD_NAME,     // 🔧 FIX: must exist
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  }
};

module.exports = config;






















// require('dotenv').config();

// const dev = {
//   app: {
//     port: process.env.PORT || 5000,
//   },
//   db: {
//     url: process.env.DB_URL || 'mongodb://localhost:27017/demoDB',
//   },
//   cloudinary: {
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET,
//   }
// };

// module.exports = dev;