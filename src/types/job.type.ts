import { Model, Types } from 'mongoose';
import { IUser } from './user.type';

export interface IJob {
  title: string;
  company: string;
  country: string;
  city: string;
  jobType: 'Full-time' | 'Part-time' | 'Internship' | 'Freelance';
  status: 'Pending' | 'Rejected' | 'Interview';
  salary?: number;
  intro?: string;
  requirements?: string[];
  tasks?: string[];
  createdBy: Types.ObjectId | IUser;
}
export type IJobModel = Model<IJob, Record<string, unknown>>;
