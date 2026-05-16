import jwt from 'jsonwebtoken';
import AppError from '../../../utils/response.js';
import { ERROR_CODES } from '../../../utils/errorCodes.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return next(new AppError(ERROR_CODES.AUTH_UNAUTHORIZED));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new AppError(ERROR_CODES.AUTH_TOKEN_EXPIRED));
    }
    return next(new AppError(ERROR_CODES.AUTH_TOKEN_INVALID));
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return next(new AppError(ERROR_CODES.FORBIDDEN));
  }
  next();
};