const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json()); // JSON body parser
app.use(morgan('dev')); // request logger

// Test Route / Health Check

// Project Route
const projectRoutes = require('./routes/project.route');

app.use('/api/projects', projectRoutes);





// Certification Route 
const certificationRoutes = require('./routes/certification.route'); 

app.use('/api/certifications', certificationRoutes);



// Skills Route 
const skillRoutes = require('./routes/skill.route');
app.use('/api/skills', skillRoutes);



// Service Route 
const serviceRoutes = require('./routes/service.route');
app.use('/api/services', serviceRoutes);



// Message routes 
const messageRoutes = require('./routes/message.route');
app.use('/api/messages', messageRoutes); 

// Visitor routes
app.use('/api/visitors', require('./routes/visitor.route'));



// Routes
app.use('/api/auth', require('./routes/auth.route'));


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



