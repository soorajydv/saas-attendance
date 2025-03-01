import { Gender, UserRole } from '../enums';
import { IAddress } from './global.interface';
import { SoftDeleteDocument } from 'mongoose-delete';

export interface IUser extends Document, SoftDeleteDocument {
  _id: unknown;
  fullName: string; // User's full name
  avatar?: string; // Optional avatar URL
  email: string; // User's email (unique)
  password?: string; // User's password (hashed)
  dateOfBirth?: Date; // User's date of birth
  gender: Gender; // Gender of the user (from Gender enum)
  phoneNumber: number; // User's phone number (unique)
  address?: IAddress; // User's address (Address interface)
  role?: UserRole; // Role of the user (from UserRole enum)
  organizationId: string; // Organization reference (MongoDB ObjectId)
  OTP?: string; // One-time password (optional)
  OTPExpiresAt?: Date; // OTP expiry date (optional)
  isVerified?: boolean; // User's email/phone verification status
  lastLogin?: Date; // Last login timestamp (optional)
  isLogin?: boolean; // Is the user currently logged in?
  deletedAt?: Date; // Date of deletion (optional)
  createdAt?: Date; // Created at timestamp
  updatedAt?: Date; // Updated at timestamp
}
