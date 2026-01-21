const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  mediaType: { type: String, enum: ['image','video','pdf'], required: true },
  originalName: { type: String, required: true }
}, { _id: false });

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  featured: { type: Boolean, default: false },
  media: [mediaSchema]
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
