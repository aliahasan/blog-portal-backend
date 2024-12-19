import { NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import tryCatchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  const data = tryCatchAsync(async (req, res, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });
  return data;
};

export default validateRequest;
