import Category from '../models/category.model.js';
import MenuItem from '../../menu/models/menu.item.js';
import AppError from '../../../utils/response.js';
import { ERROR_CODES } from '../../../utils/errorCodes.js';

export const getAllCategories = async () => {
  return await Category.find().sort({ name: 1 });
};

export const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new AppError(ERROR_CODES.NOT_FOUND);
  return category;
};

export const createCategory = async (data) => {
  const existing = await Category.findOne({ name: data.name });
  if (existing) throw new AppError(ERROR_CODES.ALREADY_EXISTS);
  const category = new Category(data);
  return await category.save();
};

export const updateCategory = async (id, data) => {
  const category = await Category.findById(id);
  if (!category) throw new AppError(ERROR_CODES.NOT_FOUND);
  Object.assign(category, data);
  return await category.save();
};

export const deleteCategory = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new AppError(ERROR_CODES.NOT_FOUND);

  const linkedItems = await MenuItem.countDocuments({ productCategory: id });
  if (linkedItems > 0) {
    throw new AppError({
      ...ERROR_CODES.FORBIDDEN,
      developerMessage: `Cannot delete category with ${linkedItems} linked menu items`,
    });
  }

  await category.deleteOne();
};