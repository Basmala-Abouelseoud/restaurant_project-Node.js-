import { body, validationResult } from 'express-validator';

export const validateBooking = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('phone')
    .notEmpty().withMessage('Phone is required')
    .isMobilePhone().withMessage('Enter a valid phone number'),

  body('date')
    .notEmpty().withMessage('Date is required')
    .isDate().withMessage('Enter a valid date'),

body('time')
  .notEmpty().withMessage('Time is required')
  .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Enter a valid time (HH:MM)'),
  
  body('persons')
    .notEmpty().withMessage('Number of persons is required')
    .isInt({ min: 1, max: 4 }).withMessage('Persons must be between 1 and 4'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(e => e.msg) });
    }
    next();
  }
];