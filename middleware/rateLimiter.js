const setRateLimit = require("express-rate-limit");

const rateLimitMiddleware = setRateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 20, // 20 requests
  message: "You have exceed your 20 requests per minute limit.",
  headers: true,
});

module.exports = rateLimitMiddleware;
