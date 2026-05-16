// ─── Success Response ─────────────────────────────────────────────────────────
export const successResponse = (
  res,
  { message = "Success", data = null, statusCode = 200, meta = null }
) => {
  const body = { success: true, message, data };
  if (meta) body.meta = meta;
  return res.status(statusCode).json(body);
};

// ─── App Error ────────────────────────────────────────────────────────────────
export default class AppError extends Error {
  constructor(configOrMessage, statusCode = 400, errors = null, code = "ERROR", developerMessage = null) {
    if (typeof configOrMessage === "object" && configOrMessage !== null) {
      const {
        message = "Request failed",
        statusCode: providedStatus = 400,
        errors: providedErrors = null,
        code: providedCode = "ERROR",
        developerMessage: providedDevMessage = null,
      } = configOrMessage;

      super(message);
      this.statusCode = providedStatus;
      this.errors = providedErrors;
      this.code = providedCode;
      this.developerMessage = providedDevMessage;
    } else {
      super("Request failed");
      this.statusCode = statusCode;
      this.errors = errors;
      this.code = code;
      this.developerMessage = developerMessage || configOrMessage;
    }

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}