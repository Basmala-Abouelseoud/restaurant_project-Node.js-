import Joi from 'joi';
import validate from '../../../middleware/validate.js';

const categorySchema = Joi.object({
  name: Joi.string().min(2).max(50).lowercase().required(), 
  displayName: Joi.string().min(2).max(50).required(),
});

const categoryUpdateSchema = categorySchema.fork(
  ['name', 'displayName'],
  (field) => field.optional()
);

export const validateCategory = validate(categorySchema);
export const validateCategoryUpdate = validate(categoryUpdateSchema);