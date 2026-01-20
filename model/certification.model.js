const mongoose = require('mongoose');

/**
 * 🔧🔥 SAME mediaSchema STRUCTURE as Project
 * field name / style same
 */
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

/**
 * 🔥 SAME STRUCTURE as projectSchema
 * 🔥 SAME FIELDS as OLD certificationSchema
 */
const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },   // unchanged
  issuer: { type: String },                  // unchanged
  issueDate: { type: Date },                 // unchanged
  credentialUrl: { type: String },           // unchanged
  featured: { type: Boolean, default: false }, // unchanged
  media: [mediaSchema]                       // same structure
}, { timestamps: true });

module.exports = mongoose.model('Certification', certificationSchema);
