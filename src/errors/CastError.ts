import { IGenericErrorMessage } from './../types/error.type';
import mongoose from 'mongoose';

const CastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.message,
      message: 'Invalid Id',
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default CastError;
