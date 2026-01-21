const Visitor = require('../model/visitor.model');

exports.trackVisitor = async ({ ip, userAgent, page }) => {
  await Visitor.create({
    ip,
    userAgent,
    page
  });
};

exports.getVisitorStats = async () => {
  const totalVisits = await Visitor.countDocuments();
  const uniqueVisitors = await Visitor.distinct('ip');

  return {
    totalVisits,
    uniqueVisitors: uniqueVisitors.length
  };
};

exports.getAllVisitors = async () => {
  return await Visitor.find().sort({ visitedAt: -1 });
};
