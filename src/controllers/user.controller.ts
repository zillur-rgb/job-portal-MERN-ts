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

export const UserController = {
  updateUser,
};
