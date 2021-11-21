import { ValidationError } from "express-json-validator-middleware";

export const validationErrorHandler = (error, req, res, next) => {
    // Check the error is a validation error
    if (error instanceof ValidationError) {
      // Handle the error
      res.status(400).json({
        status: 400,
        code: "INVALID_REQUEST",
        errors: error.validationErrors
    });
      next();
    } else {
      // Pass error on if not a validation error
      next(error);
    }
};