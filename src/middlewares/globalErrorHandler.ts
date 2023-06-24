import httpStatus from 'http-status';
import { ErrorRequestHandler } from 'express';
import { IGenericErrorMessage } from '../types/error.type';
import config from '../config/config';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  //   let message: 'Something went wrong!';
  const errorMessages: IGenericErrorMessage[] = [];

  res.status(statusCode).json({
    success: false,
    message: 'Something went wrong!',
    errorMessages: errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
