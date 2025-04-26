import { Types } from "mongoose";
import { Notification } from "../models/notification.model";
import { UserNotification } from "../models/userNotification.model";

export const createNotification = async (notification: any) =>
  Notification.create(notification);

export const getNotificationById = async (id: string) =>
  Notification.findOne({ _id: id, deletedOn: { $exists: false } });

export const updateNotificationById = async (id: string, notification: any) =>
  await Notification.findOneAndUpdate(
    {
      _id: id,
      deletedOn: { $exists: false }
    },
    notification,
    { new: true }
  );

  export const getAllNotifications = async (pageSize?: number, skip?: number, sortBy: -1 | 1 = -1) => {
    let query = Notification.find({ deletedOn: { $exists: false } }).sort({ createdAt: sortBy });

    if (pageSize !== undefined && skip !== undefined) {
        query = query.limit(pageSize).skip(skip);
    }

    return query.exec();
};


export const getDriverNotifications = async (
  userId: string,
  pageSize?: number,
  skip?: number,
  sortBy: -1 | 1 = -1
) => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 30); // 30 days ago

  const pipeline: any[] = [
    {
      $match: {
        $or: [
          { role: "D" }, // Check if role is "D"
          { users: new Types.ObjectId(userId) }, // Check if userId exists in the users array
          {
            $and: [
              { role: { $exists: false } }, // Check if role field does not exist
              { users: { $exists: false } }, // Check if users field does not exist
            ],
          },
        ],
        category: "I",
        deletedOn: { $exists: false }, // Ensure deletedOn field does not exist
        createdAt: { $gte: start, $lte: end }, // Filter by createdAt range
      },
    },
    {
      $lookup: {
        from: "usernotifications", // The collection to join with (UserNotification)
        localField: "_id", // The field from the Notification collection
        foreignField: "seenDriverNotification", // The field from the UserNotification collection
        as: "seenByDriver",
      },
    },
    {
      $lookup: {
        from: "usernotifications", // The collection to join with (UserNotification)
        localField: "_id", // The field from the Notification collection
        foreignField: "seenUserNotification", // The field from the UserNotification collection
        as: "seenByUser",
      },
    },
    {
      $addFields: {
        isRead: {
          $or: [
            { $gt: [{ $size: "$seenByDriver" }, 0] }, // Check if seenByDriver array is not empty
            { $gt: [{ $size: "$seenByUser" }, 0] }, // Check if seenByUser array is not empty
          ],
        },
      },
    },
    {
      $project: {
        category: 0,
        users: 0,
        updatedAt: 0,
        __v: 0,
        role: 0,
        seenByDriver: 0,
        seenByUser: 0
      }
    },
    {
      $sort: { createdAt: sortBy }, // Sort by createdAt
    },
  ];

  // Add pagination if pageSize and skip are provided
  if (pageSize !== undefined && skip !== undefined) {
    pipeline.push({ $skip: skip }, { $limit: pageSize });
  }

  // Execute the aggregation pipeline
  return Notification.aggregate(pipeline).exec();
};



export const getPassengerNotifications = async (
  userId: string, 
  pageSize?: number, 
  skip?: number, 
  sortBy: -1 | 1 = -1
) => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 30); // 30 days ago

  const pipeline: any[] = [
    {
      $match: {
        $or: [
          { role: "P" }, // Check if role is "D"
          { users: new Types.ObjectId(userId) }, // Check if userId exists in the users array
          {
            $and: [
              { role: { $exists: false } }, // Check if role field does not exist
              { users: { $exists: false } }, // Check if users field does not exist
            ],
          },
        ],
        category: "I",
        deletedOn: { $exists: false }, // Ensure deletedOn field does not exist
        createdAt: { $gte: start, $lte: end }, // Filter by createdAt range
      },
    },
    {
      $lookup: {
        from: "usernotifications", // The collection to join with (UserNotification)
        localField: "_id", // The field from the Notification collection
        foreignField: "seenPassengerNotification", // The field from the UserNotification collection
        as: "seenByPassenger",
      },
    },
    {
      $lookup: {
        from: "usernotifications", // The collection to join with (UserNotification)
        localField: "_id", // The field from the Notification collection
        foreignField: "seenUserNotification", // The field from the UserNotification collection
        as: "seenByUser",
      },
    },
    {
      $addFields: {
        isRead: {
          $or: [
            { $gt: [{ $size: "$seenByPassenger" }, 0] }, // Check if seenByDriver array is not empty
            { $gt: [{ $size: "$seenByUser" }, 0] }, // Check if seenByUser array is not empty
          ],
        },
      },
    },
    {
      $project: {
        category: 0,
        users: 0,
        updatedAt: 0,
        __v: 0,
        role: 0,
        seenByPassenger: 0,
        seenByUser: 0
      }
    },
    {
      $sort: { createdAt: sortBy }, // Sort by createdAt
    },
  ];

  // Add pagination if pageSize and skip are provided
  if (pageSize !== undefined && skip !== undefined) {
    pipeline.push({ $skip: skip }, { $limit: pageSize });
  }

  // Execute the aggregation pipeline
  return Notification.aggregate(pipeline).exec();
};


export const getUserNotifications = async (pageSize?: number, skip?: number) => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 30); // 30 days ago

  const query = {
      $or: [
          { users: { $ne: [] } }, // If 'users' array is not empty
          {
              users: { $size: 0 }, // If 'users' array is empty
              role: { $exists: false } // If 'role' field does not exist
          }
      ],
      deletedOn: { $exists: false }, // Ensure 'deletedOn' field does not exist
      createdAt: { $gte: start, $lte: end } // Date range
  };

  let notificationsQuery = Notification.find(query).sort({ createdAt: -1 });

  if (pageSize !== undefined && skip !== undefined) {
      notificationsQuery = notificationsQuery.skip(skip).limit(pageSize);
  }

  return notificationsQuery.exec();
};


export const getUserNotificationByUserId = async (userId: string) => UserNotification.findOne({ userId });

export const createUserNotification = async (
  userId: string,
  deviceId?: string,
) => UserNotification.create({ userId, deviceId });

export const updateUserNotification = async (
  userId: string,
  deviceId?: string,
  seenNotification?: string
) => {
  console.log("seenNotification", seenNotification);
  const result = UserNotification.findOneAndUpdate({ userId }, { deviceId, seenNotification: seenNotification }, { new: true });
  return result
}

export const getFCMTokensByUserIds = async (userIds: string[]) => {
  const tokens = (await UserNotification.find({ userId: { $in: userIds } }).select('deviceId'))
    .map((UserNotification: any) => UserNotification.deviceId);
  return tokens
}

export const getNotifications = async () => Notification.find({ deletedOn: { $exists: false } });

export const getNotificationsByRole = async (role:string) => Notification.find({ role });

export const getNotificationsByUsers = async() => Notification.find({users:{$exists:true}});

export const getNotificationForAllUsers = async() => Notification.find({users:{$exists:false},role:{$exists:false}});