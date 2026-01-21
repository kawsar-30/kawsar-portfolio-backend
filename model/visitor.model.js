const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  userAgent: { type: String, required: true },
  path: { type: String, default: '/' },
  visits: { type: Number, default: 1 },
  lastVisited: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);
