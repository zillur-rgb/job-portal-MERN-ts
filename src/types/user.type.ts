import { Model, Document } from 'mongoose';

export interface IUserDocument extends IUser, Document {
  createJWT(): string;
  comparePassword(pw: string): boolean;
}

// export type IUserModel = Model<IUserDocument>;

export interface IUser {
  name: string;
  lastName?: string;
  email: string;
  password: string;
  location?: string;
}

export type IUserModel = Model<IUserDocument, Record<string, unknown>>;
