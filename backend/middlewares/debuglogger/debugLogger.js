const debugLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const userId = req.user?._id || "anonymous";

  console.log(`[${timestamp}] ${method} ${url} — User: ${userId}`);
  next();
};

module.exports = debugLogger;
