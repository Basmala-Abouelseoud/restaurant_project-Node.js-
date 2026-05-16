import Joi from 'joi';
import validate from '../../../middleware/validate.js';

const bookingSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(7).max(15).required(),
  date: Joi.date().iso().greater('now').required(),
  time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({ 'string.pattern.base': 'Time must be in HH:MM format' }),
  persons: Joi.number().integer().min(1).max(4).required(),
});

export const validateBooking = validate(bookingSchema);