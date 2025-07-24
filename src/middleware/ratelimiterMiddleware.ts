import rateLimit from "express-rate-limit";

const subscribeRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    status: 429,
    message: "Too many subscription requests. Please try again later.",
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default subscribeRateLimiter;
