const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    max: 60,
    windowMs: 1 * 60 * 1000,
    delayMs: 1000,
    message:"Too many requests befor, please try again later after 5 minutes"
  });
module.exports=limiter;