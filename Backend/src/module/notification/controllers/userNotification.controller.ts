import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthRequest } from '../../../middlewares/auth.middleware';
import {
  sendBadRequest,
  sendNotFound,
  sendSuccess,
} from '../../../utils/responseUtil';
import { getAllExistingNotificationsOfSelf } from '../helpers/notification';
import { getNotificationById } from '../services/notification.service';
import {
  createUserNotification,
  getUserNotificationByUserId,
  updateFCMToken,
  updateSeenNotificationByUserId,
} from '../services/userNotification.service';

class UserNotificationController {
  getOne = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userNotification = await getUserNotificationByUserId(req.userId);
    if (!userNotification)
      return sendNotFound(res, 'UserNotification not found');
    return sendSuccess(res, 'UserNotification found', userNotification);
  });

  createOne = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userNotification = await getUserNotificationByUserId(req.userId);
    if (userNotification) return sendBadRequest(res, 'UserId already exists');
    req.body.userId = req.userId;
    const newNotification = await createUserNotification(req.body);
    return sendSuccess(res, 'DeviceID (FCM token) inserted', newNotification);
  });

  updateOne = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userNotification = await getUserNotificationByUserId(req.userId);
    if (!userNotification)
      return sendNotFound(res, 'DeviceId/UserId not found');
    const updatedNotification = await updateFCMToken(
      req.userId,
      req.body.deviceId
    );
    if (!updatedNotification)
      return sendBadRequest(res, 'Failed to update UserNotification');
    return sendSuccess(res, 'UserNotification updated', updatedNotification);
  });

  markOneNotificationAsRead = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const { id } = req.params;
      const existingNotification = await getNotificationById(id);

      if (!existingNotification)
        return sendNotFound(res, 'Notification not found');

      let updateField: string; // No default value

      if ('role' in existingNotification) {
        updateField =
          existingNotification.role === 'D'
            ? 'seenDriverNotification'
            : existingNotification.role === 'P'
              ? 'seenPassengerNotification'
              : 'seenUserNotification';
      } else if (
        'users' in existingNotification ||
        (!('role' in existingNotification) &&
          !('users' in existingNotification))
      ) {
        updateField = 'seenUserNotification';
      } else {
        return sendBadRequest(res, 'Invalid notification format'); // Ensure updateField is always set
      }

      const updateSeenNotification = await updateSeenNotificationByUserId(
        req.userId,
        { [updateField]: id }
      );

      if (!updateSeenNotification)
        return sendBadRequest(res, 'User token not registered');

      return sendSuccess(res, 'Notification marked as read');
    }
  );

  markAllNotificationAsRead = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const role = req.query.role || req.user?.role;
      if (!role) return sendBadRequest(res, 'Role is required');
      if (req.query.role === 'D' && req.user?.role === 'P') {
        return sendBadRequest(
          res,
          'Passenger is not allowed to request for driver notifications'
        );
      }
      // Step 2: Get all relevant notifications
      const notifications = await getAllExistingNotificationsOfSelf(req);
      const {
        specificNotificationIds,
        notificationIdsByRole,
        notificationIdsForAll,
      } = notifications as any;
      console.log(
        'specificNotificationIds',
        specificNotificationIds,
        'notificationIdsByRole',
        notificationIdsByRole,
        'notificationIdsForAll',
        notificationIdsForAll
      );

      // Step 3: Get the user's seen notifications
      const userNotifications = await getUserNotificationByUserId(req.userId);
      if (!userNotifications)
        return sendNotFound(res, 'DeviceId/UserId not registered');

      // Convert all existing seen notifications to strings for comparison
      const seenPassengerNotifications = new Set(
        userNotifications.seenPassengerNotification?.map((id) =>
          id.toString()
        ) || []
      );
      const seenDriverNotifications = new Set(
        userNotifications.seenDriverNotification?.map((id) => id.toString()) ||
          []
      );
      const seenUserNotifications = new Set(
        userNotifications.seenUserNotification?.map((id) => id.toString()) || []
      );

      console.log(
        'seenPassengerNotifications',
        seenPassengerNotifications,
        'seenDriverNotifications',
        seenDriverNotifications,
        'seenUserNotifications',
        seenUserNotifications
      );

      if (role === 'D') {
        // For Driver role: Add only new notifications
        const newSeenDriverNotifications = [
          ...seenDriverNotifications,
          ...notificationIdsByRole.filter(
            (id: any) => !seenDriverNotifications.has(id)
          ),
        ];
        const newSeenUserNotifications = [
          ...seenUserNotifications,
          ...[...specificNotificationIds, ...notificationIdsForAll].filter(
            (id) => !seenUserNotifications.has(id)
          ),
        ];

        userNotifications.seenDriverNotification = newSeenDriverNotifications;
        userNotifications.seenUserNotification = newSeenUserNotifications;
      } else if (role === 'P') {
        // For Passenger role: Add only new notifications
        const newSeenPassengerNotifications = [
          ...seenPassengerNotifications,
          ...notificationIdsByRole.filter(
            (id: any) => !seenPassengerNotifications.has(id)
          ),
        ];
        const newSeenUserNotifications = [
          ...seenUserNotifications,
          ...[...specificNotificationIds, ...notificationIdsForAll].filter(
            (id) => !seenUserNotifications.has(id)
          ),
        ];

        userNotifications.seenPassengerNotification =
          newSeenPassengerNotifications;
        userNotifications.seenUserNotification = newSeenUserNotifications;
      } else {
        return sendBadRequest(res, 'Invalid role');
      }

      // Step 5: Save the updated user notifications
      await userNotifications.save();

      return sendSuccess(res, 'All notifications marked as read successfully');
    }
  );
}

const userNotificationController = new UserNotificationController();
export default userNotificationController;
