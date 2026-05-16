import * as menuService from '../services/menu.service.js';
import { successResponse } from '../../../utils/response.js';

export const getAll = async (req, res, next) => {
  try {
    const items = await menuService.getAllMenu();
    return successResponse(res, {
      message: 'Menu items retrieved successfully',
      data: items,
    });
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const item = await menuService.getMenuById(req.params.id);
    return successResponse(res, {
      message: 'Menu item retrieved successfully',
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const item = await menuService.createMenu(req.body, req.file);
    return successResponse(res, {
      message: 'Menu item created successfully',
      data: item,
      statusCode: 201,
    });
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const item = await menuService.updateMenu(req.params.id, req.body, req.file);
    return successResponse(res, {
      message: 'Menu item updated successfully',
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await menuService.deleteMenu(req.params.id);
    return successResponse(res, {
      message: 'Menu item deleted successfully',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};