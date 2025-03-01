export interface IAddress {
  city: string;
  street?: string;  // Optional
  district?: string; // Optional
  state: string;
  country: string;
  zipCode?: string; // Optional
}

export interface IOrganization {
  _id: string;
  name: string;
  email: string;
  phone: string;
  logoUrl?: string; // Optional
  organizationType: string;
  address?: IAddress;
  subscriptionPlan: SubscriptionPlan;
  status: OrganizationStatus;
}

export enum SubscriptionPlan {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
}

export enum OrganizationStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}