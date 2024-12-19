import { NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import tryCatchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  const data = tryCatchAsync(async (req, res, next: NextFunction) => {
    const parsedBody = await schema.parseAsync(req.body, req.cookies);
    req.body = parsedBody;
    next();
  });
  return data;
};

export default validateRequest;
