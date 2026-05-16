import * as authService from '../services/auth.service.js';
import { successResponse } from '../../../utils/response.js';

export const register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);
    return successResponse(res, {
      message: 'User registered successfully',
      data: result,
      statusCode: 201,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);
    return successResponse(res, {
      message: 'Login successful',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};