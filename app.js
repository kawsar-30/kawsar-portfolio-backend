const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // JSON body parser
app.use(morgan('dev')); // request logger

// Test Route / Health Check

// Project Route
const projectRoutes = require('./routes/project.route');

app.use('/api/projects', projectRoutes);





// Certification Route 
const certificationRoutes = require('./routes/certification.route'); 

app.use('/api/certifications', certificationRoutes);




app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '✅ Project API is working'
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;



// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// require('dotenv').config(); 


// const app= express() 


// // Middlewares
// app.use(cors()); 








// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: err.message || 'Internal Server Error'
//   });
// });


// // Health check
// app.get('/', (req, res) => {
//   res.send('✅ Project API is working');
// });


// module.exports=app;