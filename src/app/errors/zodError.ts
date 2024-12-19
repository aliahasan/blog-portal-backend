import { ZodError, ZodIssue } from 'zod';
import { TGenericError } from '../interface/error';

const handleZodError = (err: ZodError): TGenericError => {
  const statusCode = 400;
  const error = err.issues.map((issue: ZodIssue) => ({
    field: issue?.path[issue.path.length - 1],
    message: issue.message,
  }));
  return {
    statusCode,
    message: 'Validation error',
    error,
  };
};

export default handleZodError;
