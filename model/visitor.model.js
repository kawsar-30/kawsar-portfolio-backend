const mongoose = require('mongoose');


const visitorSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  userAgent: { type: String, required: true },
  // এখানে Array ব্যবহার করছি যাতে সব পাথ সেভ থাকে
  visitedPaths: [{
    path: String,
    timestamp: { type: Date, default: Date.now }
  }],
  visits: { type: Number, default: 1 },
  lastVisited: { type: Date, default: Date.now }
}, { timestamps: true });

// IP এবং UserAgent এর কম্বিনেশন দিয়ে ইউজার চেনা হবে
module.exports = mongoose.model('Visitor', visitorSchema);