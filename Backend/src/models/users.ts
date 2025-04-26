import { Gender, UserRole } from './enums';
import { addressSchema } from './global.model';
import { IUser } from './interfaces/IUser';
import { model, Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const userSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    avatar: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date },
    gender: {
      type: String,
      enum: Object.values(Gender),
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      minLength: 10,
      maxLength: 70,
    },
    address: { type: addressSchema, default: null },
    role: {
      type: String,
      enum: UserRole,
      default: 'STUDENT',
      required: true,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true
    },
    busId: {
      type: Schema.Types.ObjectId,
      ref: 'Bus'
    },
    classId: {
      type: Schema.Types.ObjectId,
      ref: 'Class'
    },
    crn: { type: String, unique: true },
    OTP: { type: String },
    OTPExpiresAt: { type: Date },
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },
    isLogin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  deletedAt: true
});

// Logout method
userSchema.methods.logout = async function (): Promise<boolean> {
  this.isLogin = false;
  await this.save();
  return true;
};

// Login method
userSchema.methods.updateLoginInfo = async function (): Promise<boolean> {
  this.isLogin = true;
  if (!this.isVerified) this.isVerified = true;
  this.lastLogin = new Date();
  await this.save();
  return true;
};

const User = model<IUser>('User', userSchema);

export default User;


