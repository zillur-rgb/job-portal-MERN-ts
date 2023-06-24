import { Request, Response } from 'express';
import catchAsync from '../shared/catchAsync';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';
import { User } from '../models/user.model';
import sendResponse from '../shared/sendResponse';

const createUser = catchAsync(async (req: Request, res: Response) => {
  // Find if there is any existing user
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists!');
  }

  const user = await User.create(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: user,
  });
});

export const AuthController = {
  createUser,
};
