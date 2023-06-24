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
  const token = await user.createJWT();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully',
    data: {
      name: user.name,
      lastName: user?.lastName,
      email: user.email,
      location: user?.location,
    },
    token,
  });
});

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error();
  }

  // find user by email
  const user = await User.findOne({ email }).select('password');

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid email or password!');
  }

  // comparing password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid Email or Password');
  }

  const token = await user.createJWT();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in',
    token,
    // data: {
    //   name: user.name,
    //   lastName: user.lastName,
    //   email: user.email,
    //   location: user.location,
    // },
  });
});

export const AuthController = {
  createUser,
  loginUser,
};
