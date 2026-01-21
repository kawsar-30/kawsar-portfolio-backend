const { trackVisitor } = require('../service/visitor.service');

module.exports = async (req, res, next) => {
  try {
    const ip =
      req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress ||
      'unknown';

    const userAgent = req.headers['user-agent'] || 'unknown';
    const page = req.originalUrl;

    // Ignore admin APIs
    if (page.startsWith('/api/visitors')) {
      return next();
    }

    await trackVisitor({
      ip,
      userAgent,
      page
    });

    next();
  } catch (err) {
    next();
  }
};
