const dev = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: 0,
      message: err.message,
      stack: err.stack,
    });
  };
  
  const prod = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    if(err.isOperational){
        res.status(statusCode).json({
            success: 0,
            message: err.message,
          });
    }
    else{
        res.status(statusCode).json({
            success: 0,
            message: "Smoething went Wrong",
          });
    }
    
  };
  
  module.exports = (err, req, res, next) => {
    const env = process.env.running_environment;
    if (env === 'development') {
      dev(err, req, res, next); // Pass req as an argument to dev function
    } else {
      prod(err, req, res, next); // Pass req as an argument to prod function
    }
  };