const asyncHandler = (fn) => {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);  // Pass any errors to the global error handler
    };
  };
  
  export default asyncHandler;
  