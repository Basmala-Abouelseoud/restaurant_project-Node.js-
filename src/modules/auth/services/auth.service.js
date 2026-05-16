import 'dotenv/config';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import AppError from '../../../utils/response.js';
import { ERROR_CODES } from '../../../utils/errorCodes.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';

const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

export const registerUser = async ({ name, email, password, phoneNumber }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new AppError(ERROR_CODES.AUTH_EMAIL_IN_USE);

  const user = new User({ name, email, password, phoneNumber, role: 'user' });
  const token = generateToken(user);
  await user.save();

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    },
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError(ERROR_CODES.AUTH_INVALID_CREDENTIALS);

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new AppError(ERROR_CODES.AUTH_INVALID_CREDENTIALS);

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    },
  };
};