import * as dashboardService from '../services/dashboard.service.js';
import { successResponse } from '../../../utils/response.js';

export const getStats = async (req, res, next) => {
  try {
    const data = await dashboardService.getStats();
    return successResponse(res, {
      message: 'Dashboard data retrieved successfully',
      data,
    });
  } catch (err) {
    next(err);
  }
};