import { Schema, model } from "mongoose";
import { OrganizationStatus } from "../../models/enums";
import { addressSchema } from "../../models/global.model";
import { IOrganization } from "./IOrganization";
import mongooseDelete from 'mongoose-delete';

const organizationSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  logoUrl: { type: String },
  address: addressSchema,
  organizationType: { type: String },
  status: {
    type: String,
    enum: Object.values(OrganizationStatus), // Use the enum for validation
    default: OrganizationStatus.PENDING,      // Default value
  },
  subscriptionPlan: { type: String, default: "FREE" },
  subscriptionExpiry: { type: Date },
  isActive: { type: Boolean, default: true },
  adminId: { type: Schema.Types.ObjectId, ref: "User" },
  attendanceSettings: {
    enableNotifications: { type: Boolean, default: true },
    attendanceThreshold: { type: Number, default: 75 },
    gracePeriod: { type: Number, default: 5 },
  },
  billingInfo: {
    billingName: { type: String },
    billingEmail: { type: String },
    billingPhone: { type: String },
    creditCardNumber: { type: String },
    creditCardExpiry: { type: String },
    creditCardCVV: { type: String },
  },
  timezone: { type: String, default: "America/New_York" },
  language: { type: String, default: "en" }, 
  deletedAt: { type: Date },
});

organizationSchema.plugin(mongooseDelete, { 
  overrideMethods: 'all',
  deletedAt: true 
});

organizationSchema.methods.setAdmin = async function (id:string) {
  this.adminId = id;
  await this.save();
  return true;
};

const Organization = model<IOrganization>("Organization", organizationSchema);

export default Organization;
