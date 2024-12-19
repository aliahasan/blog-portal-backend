/* eslint-disable @typescript-eslint/no-explicit-any */
import { TError, TGenericError } from '../interface/error';

const handleDuplicateError = (err: any): TGenericError => {
  const statusCode = 400;

  // Extract the duplicate field name from the error message
  const match = err?.message?.match(/index: ([^ ]+)/);
  const field = match ? match[1].split('_')[0] : 'unknown';

  const extractedMessage = `${field} is already exist`;
  const error: TError = [
    {
      field,
      message: extractedMessage,
    },
  ];

  return {
    statusCode,
    message: 'Duplicate entry',
    error,
  };
};

export default handleDuplicateError;
