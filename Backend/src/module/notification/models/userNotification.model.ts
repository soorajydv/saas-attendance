import { Schema, model } from "mongoose";

export interface IUserNotification {
    userId: string;
    deviceId?: string;
    seenDriverNotification?: string[];
    seenPassengerNotification?: string[];
    seenUserNotification?: string[];
}

const userNotificationSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        deviceId: { type: String },
        seenPassengerNotification: { type: [Schema.Types.ObjectId], ref: "Notification" },
        seenDriverNotification: { type: [Schema.Types.ObjectId], ref: "Notification" },
        seenUserNotification: { type: [Schema.Types.ObjectId], ref: "Notification" },
    },
    { timestamps: true }
);

// Create an index for efficient querying by userId
userNotificationSchema.index({ userId: 1 });

export const UserNotification = model<IUserNotification>("UserNotification", userNotificationSchema);
