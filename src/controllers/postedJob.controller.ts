import httpStatus from 'http-status';
import { JobPosting } from '../models/job.model';
import catchAsync from '../shared/catchAsync';
import sendResponse from '../shared/sendResponse';
import { Request, Response } from 'express';
import ApiError from '../errors/ApiError';

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

// ======== UPDATE JOBS =========
const updateJobPosting = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const { id } = req.params;
    const { title, company, intro } = req.body;

    // validation
    if (!title || !company || !intro) {
      throw new Error('Please provide necessary fields');
    }

    // find job
    const job = await JobPosting.findOne({ _id: id });

    // Validation
    if (!job) throw new Error('No job found with this id!');

    if (req?.user?.userId !== job.createdBy.toString()) {
      throw new Error('You are not authorized to update this job!');
    }

    const updateResult = await JobPosting.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      },
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Job updated successfully!',
      data: updateResult,
    });
  },
);

const deleteJobPosting = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const { id } = req.params;
    // Find job
    const job = await JobPosting.findOne({ _id: id });

    // validation
    if (!job) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'No job found with correspondant id',
      );
    }

    if (req?.user?.userId !== job.createdBy.toString())
      throw new Error('You are not authorized to delete this job');

    const deletedJob = await job.deleteOne({ _id: id });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Job has been deleted!',
      data: deletedJob,
    });
  },
);

export const JobPostingController = {
  createJob,
  getAllJobs,
  updateJobPosting,
  deleteJobPosting,
};
