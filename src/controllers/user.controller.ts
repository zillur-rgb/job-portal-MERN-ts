import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../shared/catchAsync';
import { User } from '../models/user.model';
import ApiError from '../errors/ApiError';
import sendResponse from '../shared/sendResponse';
// Define a custom interface that extends the default Request interface
interface CustomRequest extends Request {
  user?: { userId: string }; // Add the user property to the interface
}

const updateUser = catchAsync(async (req: CustomRequest, res: Response) => {
  // Checking if not exist
  const { name, lastName, email, location } = req.body;

  if (!name || !email || !lastName || !location) {
    throw new Error('Provide all fields');
  }

  const user = await User.findOne({
    _id: req.user && req.user.userId,
  });
  if (user) {
    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.location = location;
    user.password;
    await user.save();
    const token = user.createJWT();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User updated succesfully',
      data: {
        name: user?.name,
        lastName: user?.lastName,
        email: user?.email,
        location: user?.location,
      },
      token,
    });
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }
});

// ====== Get User Data =======
export const getUser = catchAsync(async (req, res) => {
  const user = await User.findById({ _id: req.body.user.userId });
  if (!user) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'User not found!',
    });
  } else {
    user.password = '';
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User retrieved!',
      data: user,
    });
  }
});

export const UserController = {
  updateUser,
  getUser,
};
