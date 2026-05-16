export const ERROR_CODES = {
  // ─── Validation ───────────────────────────────────────────────────────────
  VALIDATION_ERROR: {
    code: "VALIDATION_ERROR",
    message: "Invalid input provided",
    developerMessage: "Validation error",
    statusCode: 422,
  },

  // ─── Auth ─────────────────────────────────────────────────────────────────
  AUTH_MISSING_CREDENTIALS: {
    code: "AUTH_MISSING_CREDENTIALS",
    message: "Request failed",
    developerMessage: "Email and password are required",
    statusCode: 400,
  },
  AUTH_INVALID_CREDENTIALS: {
    code: "AUTH_INVALID_CREDENTIALS",
    message: "Request failed",
    developerMessage: "Invalid email or password",
    statusCode: 401,
  },
  AUTH_UNAUTHORIZED: {
    code: "AUTH_UNAUTHORIZED",
    message: "Request failed",
    developerMessage: "Unauthorized",
    statusCode: 401,
  },
  AUTH_SIGNUP_REQUIRED_FIELDS: {
    code: "AUTH_SIGNUP_REQUIRED_FIELDS",
    message: "Request failed",
    developerMessage: "Name, email and password are required",
    statusCode: 400,
  },
  AUTH_EMAIL_IN_USE: {
    code: "AUTH_EMAIL_IN_USE",
    message: "Request failed",
    developerMessage: "Email already in use",
    statusCode: 409,
  },
  AUTH_TOKEN_INVALID: {
    code: "AUTH_TOKEN_INVALID",
    message: "Request failed",
    developerMessage: "Invalid or malformed token",
    statusCode: 401,
  },
  AUTH_TOKEN_EXPIRED: {
    code: "AUTH_TOKEN_EXPIRED",
    message: "Request failed",
    developerMessage: "Token has expired, please login again",
    statusCode: 401,
  },

  // ─── Resources ────────────────────────────────────────────────────────────
  NOT_FOUND: {
    code: "NOT_FOUND",
    message: "Resource not found",
    developerMessage: "Not Found",
    statusCode: 404,
  },
  ALREADY_EXISTS: {
    code: "ALREADY_EXISTS",
    message: "Request failed",
    developerMessage: "Resource already exists",
    statusCode: 409,
  },
  FORBIDDEN: {
    code: "FORBIDDEN",
    message: "Request failed",
    developerMessage: "You do not have permission to perform this action",
    statusCode: 403,
  },

  // ─── Files ────────────────────────────────────────────────────────────────
  FILE_UPLOAD_ERROR: {
    code: "FILE_UPLOAD_ERROR",
    message: "Request failed",
    developerMessage: "File upload failed",
    statusCode: 400,
  },
  FILE_NOT_FOUND: {
    code: "FILE_NOT_FOUND",
    message: "Request failed",
    developerMessage: "File not found",
    statusCode: 404,
  },

  // ─── Server ───────────────────────────────────────────────────────────────
  INTERNAL_SERVER_ERROR: {
    code: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong, please try again later",
    developerMessage: "Internal server error",
    statusCode: 500,
  },
};