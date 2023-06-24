import mongoose, { Schema } from 'mongoose';
import { IUser, IUserModel } from '../types/user.type';
import validator from 'validator';
import bcrypt from 'bcryptjs';
const userSchema = new Schema<IUser>(
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

export const User = mongoose.model<IUser, IUserModel>('User', userSchema);
