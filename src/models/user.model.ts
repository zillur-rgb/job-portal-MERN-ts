import mongoose, { Schema } from 'mongoose';
import { IUser, IUserDocument, IUserModel } from '../types/user.type';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config';

// Define the interface for the user document

const userSchema = new Schema<IUserDocument, IUserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
    },
    lastName: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      minlength: [6, 'Password length should be greater than 6 character'],
    },
    location: {
      type: String,
      default: 'Germany',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// Hashing the password
userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Generating token using jwt
userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, config.jwt_secret as string, {
    expiresIn: '1d',
  });
};

// Comparing password
userSchema.methods.comparePassword = async function (userPassword: string) {
  const isMatch = await bcrypt.compare(userPassword, this.password);

  return isMatch;
};

export const User = mongoose.model<IUser, IUserModel>('User', userSchema);
