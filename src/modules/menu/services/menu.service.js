import MenuItem from '../models/menu.item.js';
import Category from '../../category/models/category.model.js';
import { saveImage } from '../middleware/upload.middleware.js';
import AppError from '../../../utils/response.js';
import { ERROR_CODES } from '../../../utils/errorCodes.js';

export const getAllMenu = async () => {
  const items = await MenuItem.find().populate('productCategory', 'name displayName');
  return items.map((item) => {
    const isCloudinaryUrl = item._doc.imageUrl?.startsWith('http');
    return {
      ...item._doc,
      imageUrl: isCloudinaryUrl ? item._doc.imageUrl : `/images/${item._doc.imageUrl.split('/').pop()}`,
    };
  });
};

export const getMenuById = async (id) => {
  const item = await MenuItem.findById(id).populate('productCategory', 'name displayName');
  if (!item) throw new AppError(ERROR_CODES.NOT_FOUND);
  return item;
};

export const getMenuByCategory = async (categoryId) => {
  const items = await MenuItem.find({ productCategory: categoryId })
    .populate('productCategory', 'name displayName');
  return items.map((item) => {
    const isCloudinaryUrl = item._doc.imageUrl?.startsWith('http');
    return {
      ...item._doc,
      imageUrl: isCloudinaryUrl ? item._doc.imageUrl : `/images/${item._doc.imageUrl.split('/').pop()}`,
    };
  });
};

export const createMenu = async (data, file) => {
  if (!file) throw new AppError(ERROR_CODES.FILE_UPLOAD_ERROR);

  const category = await Category.findById(data.productCategory);
  if (!category) throw new AppError({ ...ERROR_CODES.NOT_FOUND, developerMessage: 'Category not found' });

  const cloudinaryUrl = await saveImage(file);
  
  const item = new MenuItem({ ...data, imageUrl: cloudinaryUrl });
  return await item.save();
};

export const updateMenu = async (id, data, file) => {
  const item = await MenuItem.findById(id);
  if (!item) throw new AppError(ERROR_CODES.NOT_FOUND);

  if (data.productCategory) {
    const category = await Category.findById(data.productCategory);
    if (!category) throw new AppError({ ...ERROR_CODES.NOT_FOUND, developerMessage: 'Category not found' });
  }

  Object.assign(item, data);
  
  if (file) {
    const cloudinaryUrl = await saveImage(file);
    item.imageUrl = cloudinaryUrl;
  }

  return await item.save();
};

export const deleteMenu = async (id) => {
  const item = await MenuItem.findById(id);
  if (!item) throw new AppError(ERROR_CODES.NOT_FOUND);
  await item.deleteOne();
};