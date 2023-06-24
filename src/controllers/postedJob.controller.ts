import httpStatus from 'http-status';
import { JobPosting } from '../models/job.model';
import catchAsync from '../shared/catchAsync';
import sendResponse from '../shared/sendResponse';
import { Request, Response } from 'express';

// Define a custom interface that extends the default Request interface
interface CustomRequest extends Request {
  user?: { userId: string }; // Add the user property to the interface
}

// ======= Create Job =======
const createJob = catchAsync(async (req: CustomRequest, res: Response) => {
  req.body.createdBy = req?.user?.userId;
  const job = await JobPosting.create(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Job created successfully',
    data: job,
  });
});

// ======= Get Jobs ==========
const getAllJobs = catchAsync(async (req: CustomRequest, res: Response) => {
  const createdBy = req?.user?.userId || '';
  const job = await JobPosting.find({
    createdBy,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fetched all jobs',
    data: job,
  });
});

export const JobPostingController = {
  createJob,
  getAllJobs,
};
