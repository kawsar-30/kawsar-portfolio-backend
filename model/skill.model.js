const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },     
  category: { type: String },                 
  icon: {                                     
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    mediaType: { type: String, enum: ['image'], required: true },
    originalName: { type: String, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
