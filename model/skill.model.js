const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },      // Skill name
  category: { type: String },                  // e.g., Web Security, Network, Tools
  icon: {                                      // Image/Icon for the skill
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    mediaType: { type: String, enum: ['image'], required: true },
    originalName: { type: String, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
