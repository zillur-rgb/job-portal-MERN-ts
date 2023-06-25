import httpStatus from 'http-status';
import { JobPosting } from '../models/job.model';
import catchAsync from '../shared/catchAsync';
import sendResponse from '../shared/sendResponse';
import { Request, Response } from 'express';
import ApiError from '../errors/ApiError';
import mongoose from 'mongoose';
import moment from 'moment';
import { IQueryObject } from '../types/queryObjects.type';

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
  const { status, jobType, search, sort } = req.query;

  // Conditions for searching filters
  const queryObject: IQueryObject = {
    createdBy: req?.user?.userId,
  };

  // Logic filters
  if (status && status !== 'all') {
    queryObject.status = status as string;
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType as string;
  }
  if (search) {
    queryObject.position = { $regex: search, $option: 'i' };
  }

  let queryResult = JobPosting.find(queryObject);

  // sorting
  if (sort === 'latest') {
    queryResult = queryResult.sort('-createdAt');
  }
  if (sort === 'oldest') {
    queryResult = queryResult.sort('createdAt');
  }

  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  queryResult = queryResult.skip(skip).limit(limit);
  const totalJobs = await JobPosting.countDocuments(queryResult);
  const numOfPage = Math.ceil(totalJobs / limit);
  const jobs = await queryResult;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fetched all jobs',
    data: { totalJobs, numOfPage, jobs },
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

// ========= Jobs STATS & FILTERS ========
const statsJobPosting = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const stats: { _id: string; count: number }[] = await JobPosting.aggregate([
      // Search by user jobs
      {
        $match: { createdBy: new mongoose.Types.ObjectId(req?.user?.userId) },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);
    const defaultStats = {
      pending: stats[0]?.count || 0,
      rejected: stats[1]?.count || 0,
      interview: stats[2]?.count || 0,
    };

    // monthly yearly stats
    let monthlyApplication = await JobPosting.aggregate([
      {
        $match: { createdBy: new mongoose.Types.ObjectId(req?.user?.userId) },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    monthlyApplication = monthlyApplication.map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');

      return { date, count };
    });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Stats',
      data: {
        totalJobs: stats.length,
        defaultStats,
        monthlyApplication,
      },
    });
  },
);

export const JobPostingController = {
  createJob,
  getAllJobs,
  updateJobPosting,
  deleteJobPosting,
  statsJobPosting,
};
