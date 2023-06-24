import mongoose, { Schema } from 'mongoose';
import { IJob } from '../types/job.type';
import { jobStatus, jobType } from '../constants/job.constant';

const jobPostingSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: [true, 'Title is required!'],
    },
    company: {
      type: String,
      required: [true, 'Company name is required!'],
    },
    country: {
      type: String,
      default: 'Germany',
      required: [true, 'Country name is required!'],
    },
    city: {
      type: String,
      default: 'Dortmund',
      reuqired: [true, 'City is required!'],
    },
    jobType: {
      type: String,
      default: 'Full-time',
      required: [true, 'Job type is required!'],
      enum: jobType,
    },
    status: {
      type: String,
      default: 'Pending',
      required: [true, 'Job status is required!'],
      enum: jobStatus,
    },
    salary: String,
    intro: {
      type: String,
      maxlength: 100,
    },
    requirements: [String],
    tasks: [String],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const JobPosting = mongoose.model('JobPosting', jobPostingSchema);
