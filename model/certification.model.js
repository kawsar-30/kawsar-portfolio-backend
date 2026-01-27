const mongoose = require('mongoose');


const mediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  mediaType: {
    type: String,
    enum: ['image', 'pdf'], // 🔧 certification rule
    required: true
  },
  originalName: { type: String, required: true }
}, { _id: false });


const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },   
  issuer: { type: String },                 
  issueDate: { type: Date },                
  credentialUrl: { type: String },           
  featured: { type: Boolean, default: false }, 
  media: [mediaSchema]                       
}, { timestamps: true });

module.exports = mongoose.model('Certification', certificationSchema);
