import { Model } from 'mongoose';

export interface IUser {
  name: string;
  lastName?: string;
  email: string;
  password: string;
  location?: string;
}

export type IUserModel = Model<IUser, Record<string, unknown>>;
