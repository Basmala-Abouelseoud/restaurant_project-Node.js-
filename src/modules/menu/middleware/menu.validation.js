import Joi from 'joi';
import AppError from '../../../utils/response.js';
import { ERROR_CODES } from '../../../utils/errorCodes.js';

const menuSchema = Joi.object({
  productName: Joi.string().min(3).max(100).required(),
  productPrice: Joi.number().positive().required(),
  productCategory: Joi.string().min(2).max(50).required(),
  productDescription: Joi.string().min(10).max(500).required(),
});

export const validateMenu = (req, res, next) => {
  const { error, value } = menuSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return next(
      new AppError({
        ...ERROR_CODES.VALIDATION_ERROR,
        errors: error.details.map(({ message, path }) => ({
          message: message.replace(/['"]/g, ''),
          field: path.join('.'),
        })),
      })
    );
  }

  if (!req.file) {
    return next(
      new AppError({
        ...ERROR_CODES.VALIDATION_ERROR,
        errors: [{ message: 'Image is required', field: 'image' }],
      })
    );
  }

  req.body = value;
  next();
};

export const validateMenuUpdate = (req, res, next) => {
  const updateSchema = menuSchema.fork(
    ['productName', 'productPrice', 'productCategory', 'productDescription'],
    (field) => field.optional()
  );

  const { error, value } = updateSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return next(
      new AppError({
        ...ERROR_CODES.VALIDATION_ERROR,
        errors: error.details.map(({ message, path }) => ({
          message: message.replace(/['"]/g, ''),
          field: path.join('.'),
        })),
      })
    );
  }

  req.body = value;
  next();
};