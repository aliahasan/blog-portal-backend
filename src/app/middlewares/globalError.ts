/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../errors/AppError';
import handleCastError from '../errors/castError';
import handleDuplicateError from '../errors/duplicateError';
import handleMongooseError from '../errors/mongooseError';
import handleZodError from '../errors/zodError';
import { TError } from '../interface/error';

const handleGlobalError: ErrorRequestHandler = (
  err,
  req,
  res,
  next: NextFunction
) => {
  let statusCode = err?.statusCode || 500;
  let message = err?.message;
  let error: TError = [
    {
      field: '',
      message: 'Something went wrong',
    },
  ];

  // Handle ZodError
  if (err instanceof ZodError) {
    const zodErrorResponse = handleZodError(err);
    statusCode = zodErrorResponse.statusCode;
    message = zodErrorResponse.message;
    error = zodErrorResponse.error;
  } else if (err?.name === 'ValidationError') {
    const validationErrorResponse = handleMongooseError(err);
    statusCode = validationErrorResponse?.statusCode;
    message = validationErrorResponse?.message;
    error = validationErrorResponse.error;
  } else if (err?.code === 11000) {
    const duplicateError = handleDuplicateError(err);
    statusCode = duplicateError.statusCode;
    message = duplicateError.message;
    error = duplicateError.error;
  } else if (err?.name === 'CastError') {
    const castErrorResponse = handleCastError(err);
    statusCode = castErrorResponse?.statusCode;
    message = castErrorResponse?.message;
    error = castErrorResponse?.error;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    error = [{ field: '', message: err?.message }];
  } else if (err instanceof Error) {
    message = err?.message;
    error = [{ field: '', message: err?.message || message }];
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default handleGlobalError;
