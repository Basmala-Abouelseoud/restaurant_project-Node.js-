import AppError from "../utils/response.js";
import { ERROR_CODES } from "../utils/errorCodes.js";

const validate = (schema, property = "body") => (req, res, next) => {
  const { error, value } = schema.validate(req[property], {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });

  if (error) {
    return next(
      new AppError({
        ...ERROR_CODES.VALIDATION_ERROR,
        errors: error.details.map(({ message, path }) => ({
          message: message.replace(/['"]/g, ""),
          field: path.join("."),
        })),
      })
    );
  }

  req[property] = value;
  next();
};

export default validate;