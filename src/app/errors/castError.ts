import mongoose from 'mongoose';
import { TError, TGenericError } from '../interface/error';

const handleCastError = (err: mongoose.Error.CastError): TGenericError => {
  const statusCode = 400;
  const error: TError = [
    {
      field: err.path,
      message: err.message,
    },
  ];
  return {
    statusCode,
    message: 'Invalid Id',
    error,
  };
};
export default handleCastError;
