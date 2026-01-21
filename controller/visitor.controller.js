const Visitor = require('../model/visitor.model');

// Track visitor automatically
exports.trackVisitor = async (req, res, next) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const path = req.body.path || '/';

    // Find existing visitor for same IP + device + path
    let visitor = await Visitor.findOne({ ip, userAgent, path });

    if(visitor){
      visitor.visits += 1;
      visitor.lastVisited = Date.now();
      await visitor.save();
    } else {
      visitor = await Visitor.create({ ip, userAgent, path });
    }

    res.status(201).json({ success: true, data: visitor });
  } catch(err){
    next(err);
  }
};

// Admin: get all visitors
exports.getAllVisitors = async (req, res, next) => {
  try{
    const visitors = await Visitor.find().sort({ lastVisited: -1 });
    res.json({ success: true, data: visitors });
  } catch(err){
    next(err);
  }
};
