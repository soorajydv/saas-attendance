import { Document } from "mongoose";

export interface IBus extends Document {
  busNumber: string;
  route: string;
  capacity: number;
  organizationId?: string;
  driverId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  delete: () => Promise<IBus>;
  isDeleted: () => boolean;
}