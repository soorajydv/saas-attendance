import { model, Schema } from "mongoose";

export enum RideStatus {
    PICKEDUP = 'PICKEDUP',
    REACHED = 'REACHED',
}

const RideSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        status: { type: String, enum: Object.values(RideStatus), required: true },
    },
    {
        timestamps: true,
    }
);

export const Ride = model('Ride', RideSchema);