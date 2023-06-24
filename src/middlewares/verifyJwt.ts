import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';

// Define a custom interface that extends the default Request interface
interface CustomRequest extends Request {
  user?: { userId: string }; // Add the user property to the interface
}

const verifyJwt = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization as string;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next('Auth failed');
  }

  const token = authHeader?.split(' ')[1];
  try {
    const payload = jwt.verify(
      token,
      config.jwt_secret as string,
    ) as JwtPayload;
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw Error('Error verification');
  }
};
export default verifyJwt;
