import MenuItem from '../models/menu.item.js';
import { saveImage } from '../middleware/upload.middleware.js';

export const getAllMenu = async () => {
  const items = await MenuItem.find();
  return items.map(item => ({
    ...item._doc,
    imageUrl: `/images/${item._doc.imageUrl.split('/').pop()}`
  }));
};

export const getMenuById = async (id) => {
  return await MenuItem.findById(id);
};

export const createMenu = async (data, file) => {
  if (!file) throw new Error('Image is required');
  
  const filename = saveImage(file);
  
  const item = new MenuItem({
    ...data,
    imageUrl: filename
  });
  return await item.save();
};

export const updateMenu = async (id, data, file) => {
  const item = await MenuItem.findById(id);
  if (!item) return null;

  Object.assign(item, data);
  
  if (file) {
    item.imageUrl = saveImage(file); 
  }
  
  return await item.save();
};

export const deleteMenu = async (id) => {
  const item = await MenuItem.findById(id);
  if (!item) return null;
  await item.deleteOne();
  return true;
};