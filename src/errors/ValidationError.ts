import { IGenericErrorMessage } from './../types/error.type';
import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../types/common.type';

const validationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (el: any) => {
      return {
        path: el?.path,
        message: el.message,
      };
    },
  );

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default validationError;
