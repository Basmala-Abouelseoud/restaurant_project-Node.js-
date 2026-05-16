import * as categoryService from '../services/category.service.js';
import { successResponse } from '../../../utils/response.js';

export const getAll = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    return successResponse(res, {
      message: 'Categories retrieved successfully',
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    return successResponse(res, {
      message: 'Category retrieved successfully',
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);
    return successResponse(res, {
      message: 'Category created successfully',
      data: category,
      statusCode: 201,
    });
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    return successResponse(res, {
      message: 'Category updated successfully',
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    return successResponse(res, {
      message: 'Category deleted successfully',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};