const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db.url);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
};

module.exports = connectDB;













// const mongoose = require('mongoose');
// const config = require('./config');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(config.db.url);
//     console.log('✅ MongoDB connected successfully');
//   } catch (err) {
//     console.error('❌ MongoDB connection error:', err);
//     throw err;
//   }
// };

// module.exports = connectDB;