import { SoftDeleteDocument } from 'mongoose-delete';
import { OrganizationStatus } from '../../models/enums';

export interface IAddress {
  city?: string;
  street?: string;
  district?: string;
  state: string;
  country: string;
  zipCode?: string;
}

export interface IAttendanceSettings {
  enableNotifications: boolean;
  attendanceThreshold: number;
  gracePeriod: number;
}

export interface IBillingInfo {
  billingEmail?: string;
  billingAddress?: string;
  creditCardNumber?: string;
  creditCardExpiry?: string;
  creditCardCVV?: string;
}

export interface IOrganization extends Document,SoftDeleteDocument {
  name: string;
  email: string;
  phone: string;
  logoUrl?: string;
  address: IAddress;
  organizationType: string;             //"School", "University", "Corporate"
  status?: OrganizationStatus;
  subscriptionPlan?: string;             // (e.g., "Free", "Basic", "Premium")
  subscriptionExpiry?: Date;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  adminId: string;
  attendanceSettings?: IAttendanceSettings;
  billingInfo?: IBillingInfo;
  timezone?: string;
  language?: string;
  deletedAt?:Date;
  setAdmin?:Promise<any>;
}
