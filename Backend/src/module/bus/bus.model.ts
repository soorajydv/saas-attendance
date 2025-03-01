import { model, Schema } from "mongoose";
import { IBus } from "./IBus";
import mongooseDelete from 'mongoose-delete';

const BusSchema: Schema = new Schema(
  {
    busNumber: {
      type: String,
      required: [true, "Bus number is required"],
      trim: true,
    },
    route: {
      type: String,
      required: [true, "Route is required"],
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [1, "Capacity must be at least 1"],
    },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    driverId: { type: Schema.Types.ObjectId, ref: "User" },
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true },
  },
  {
    timestamps: true,
  }
);

BusSchema.plugin(mongooseDelete, { 
  overrideMethods: 'all',
  deletedAt: true 
});

export const Bus = model<IBus>("Bus", BusSchema);
