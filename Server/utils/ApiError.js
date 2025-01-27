class ApiError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;  // Make it operational so we can distinguish it from unexpected errors
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default ApiError;
  