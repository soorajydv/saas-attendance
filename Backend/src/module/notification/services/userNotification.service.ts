import {
  IUserNotification,
  UserNotification,
} from '../models/userNotification.model';

export const createUserNotification = async (
  data: Partial<IUserNotification>
) => UserNotification.create(data);

export const getUserNotificationByUserId = async (userId: string) =>
  UserNotification.findOne({ userId });


export const updateFCMToken = async (userId: string, deviceId: string) =>
  UserNotification.findOneAndUpdate({ userId }, { deviceId });


export const updateSeenNotificationByUserId = async (
  userId: string,
  data: Partial<IUserNotification>
) => {
  console.log('data', data);

  // Dynamically extract the field name and value
  const field = Object.keys(data)[0] as keyof IUserNotification; // Assuming there's only one field (e.g., seenPassengerNotification)
  const value = data[field];

  // Construct the update operation dynamically
  const updateOperation: any = {
    $addToSet: {
      [field]: value,
    },
  };

  // Update the user notification document
  const result = await UserNotification.findOneAndUpdate(
    { userId },
    updateOperation,
    { new: true }
  );
  return result;
};
