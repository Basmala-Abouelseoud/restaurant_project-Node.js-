import 'dotenv/config'; // ✅ ضيف السطر ده
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';

export const registerUser = async ({ name, email, password, phoneNumber }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Email already in use');

  // ✅ ضيف phoneNumber
  const user = new User({ name, email, password, phoneNumber, role: 'user' });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );

  await user.save();

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, phoneNumber: user.phoneNumber, role: user.role }
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );

  // ✅ بيرجع الـ role سواء user أو admin
  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  };
};