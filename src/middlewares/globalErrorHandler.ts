import httpStatus from 'http-status';
import { ErrorRequestHandler } from 'express';
import { IGenericErrorMessage } from '../types/error.type';
import config from '../config/config';
import ApiError from '../errors/ApiError';
import validationError from '../errors/ValidationError';
import CastError from '../errors/CastError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message = 'Something went wrong!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error instanceof ApiError) {
    (statusCode = error?.statusCode),
      (message = error?.message),
      (errorMessages = error?.message
        ? [{ path: '', message: error?.message }]
        : []);
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = validationError(error);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errorMessages = simplifiedError.errorMessages);
  } else if (error?.name === 'CastError') {
    const simplifiedError = CastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
