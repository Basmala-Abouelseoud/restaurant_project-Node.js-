const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      errorMessage: 'Validation_error',
      cause: Object.values(err.errors).map((e) => e.message),
    });
  }

  // Mongoose duplicate key (email مكرر مثلاً)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      statusCode: 409,
      errorMessage: 'Duplicate_entry',
      cause: `${field} already exists`,
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      errorMessage: 'Invalid_token',
      cause: 'Invalid or malformed token',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      errorMessage: 'Token_expired',
      cause: 'Token has expired, please login again',
    });
  }

  // Default
  const cause = err.developerMessage || err.message || 'Unknown error';

  const errors =
    err.errors && Array.isArray(err.errors) && err.errors.length > 0
      ? err.errors
      : undefined;

  res.status(statusCode).json({
    success: false,
    statusCode,
    errorMessage: err.code || 'Invalid_request',
    cause,
    ...(errors && { errors }),
  });
};

export default globalErrorHandler;