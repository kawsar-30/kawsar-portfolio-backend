const Visitor = require('../model/visitor.model');

// Track visitor automatically
exports.trackVisitor = async (req, res, next) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const currentPath = req.body.path || '/';

 
    let visitor = await Visitor.findOne({ ip, userAgent });

    if (visitor) {
    
      visitor.visits += 1;
      visitor.lastVisited = Date.now();
      
      visitor.visitedPaths.push({ path: currentPath });
      await visitor.save();
    } else {
    
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


exports.getAllVisitors = async (req, res, next) => {
  try{
    const visitors = await Visitor.find().sort({ lastVisited: -1 });
    res.json({ success: true, data: visitors });
  } catch(err){
    next(err);
  }
};
