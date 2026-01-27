require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const config = require('./config/config');

// Connect to Database
connectDB()
  .then(() => {
    console.log('✅ Database connected successfully');

    // Start Server
    app.listen(config.app.port, () => {
      console.log(`🚀 Server running on port ${config.app.port}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB connection failed:', err);
    process.exit(1);
  });
