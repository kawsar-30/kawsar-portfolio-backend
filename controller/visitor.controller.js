const Visitor = require('../model/visitor.model');

// Track visitor automatically
exports.trackVisitor = async (req, res, next) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const currentPath = req.body.path || '/';

    // IP + UserAgent দিয়ে ইউজারকে খুঁজে বের করা
    let visitor = await Visitor.findOne({ ip, userAgent });

    if (visitor) {
      // যদি ইউজার আগে এসে থাকে:
      visitor.visits += 1;
      visitor.lastVisited = Date.now();
      // নতুন পাথটি হিস্টোরিতে যোগ করা (যদি আগের পাথের চেয়ে আলাদা হয় বা সব পাথই রাখতে চাও)
      visitor.visitedPaths.push({ path: currentPath });
      await visitor.save();
    } else {
      // একদম নতুন ইউজার হলে:
      visitor = await Visitor.create({ 
        ip, 
        userAgent, 
        visitedPaths: [{ path: currentPath }] 
      });
    }

    res.status(201).json({ success: true, data: visitor });
  } catch (err) {
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
