import Joi from 'joi';
import validate from '../../../middleware/validate.js';

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().min(3).max(100).required(),
  message: Joi.string().min(10).max(1000).required(),
});

export const validateContact = validate(contactSchema);