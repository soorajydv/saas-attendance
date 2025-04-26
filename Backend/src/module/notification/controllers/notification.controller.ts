import { log } from 'console';
import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import { io } from '../../..';
import { AuthRequest } from '../../../middlewares/auth.middleware';
import sendPushNotification from '../../../utils/pushNotification';
import {
  sendBadRequest,
  sendForbidden,
  sendNotFound,
  sendSuccess,
} from '../../../utils/responseUtil';
import { getUsersByIds, getUsersIds } from '../../auth/services/user.service';
import { NotificationEvents } from '../../socket/events';
import {
  getTargetByRoleOrUserIds,
  sendInAppNotification,
} from '../helpers/notification';
import {
  createNotification,
  getAllNotifications,
  getDriverNotifications,
  getNotificationById,
  getPassengerNotifications,
  updateNotificationById,
} from '../services/notification.service';
import { activeUsers } from './../../socket/event_handlers/handleActiveUsersEvent';

class NotificationController {
  //create a notification
  createOne = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { ...data } = req.body;
    const newNotification = await createNotification(data);
    if (!newNotification)
      return sendBadRequest(res, 'Failed to create notification');

    let target: string[] = [];

    // Step 1: Check if `users` field is provided
    if (req.body.users && req.body.users.length > 0) {
      // Send notifications to specific users
      target = await getTargetByRoleOrUserIds(undefined, req.body.users);
    }
    // Step 2: If `users` is not provided, check if `role` is provided
    else if (req.body.role) {
      // Send notifications to users with the specified role
      target = await getTargetByRoleOrUserIds(req.body.role);
    }
    // Step 3: If neither `users` nor `role` is provided, send to all users
    else {
      const userIds = await getUsersIds();
      target = await getTargetByRoleOrUserIds(undefined, userIds);
    }

    // Step 4: Send notifications based on the category
    if (req.body.category === 'P') {
      // Send push notification if category is "P"
      if (target.length > 0) {
        log('Sending push notification to: ', target);
        try {
          await sendPushNotification(
            target,
            req.body.title,
            req.body.description,
            req.body.image,
            true
          );
        } catch (e) {
          console.log('Errro occured: ', e);
        }
      }
    } else if (req.body.category === 'G') {
      // Send notification to active drivers through socket if category is "G"
      const drivers = activeUsers.getAllDrivers();
      const driverSockets = Object.values(drivers); // Get all socket IDs
      for (let i = 0; i < driverSockets.length; i++) {
        const socketId = driverSockets[i];
        io.to(socketId).emit(NotificationEvents.NotificationGroup, {
          title: req.body.title,
          description: req.body.description,
          image: req.body.image,
        });
      }
    } else if (req.body.category === 'I') {
      // Send in-app notification if category is "I"
      const users: Record<string, string> = Object.assign(
        {},
        activeUsers.getAllDrivers(),
        activeUsers.getAllPassengers()
      );
      let socketIds: string[] = [];

      if (req.body.users && req.body.users.length > 0) {
        // If specific users are provided
        socketIds = req.body.users
          .filter((userId: string) => users[userId]) // Check if the userId exists in the users object
          .map((userId: string) => users[userId]); // Map the userId to its socketId
      } else if (req.body.role) {
        // If a role is provided, send to users with that role
        let roleUsers: string[] = [];
        if (req.body.role === 'P') {
          roleUsers = Object.keys(activeUsers.getAllPassengers()); // Get all passenger user IDs
        } else if (req.body.role === 'D') {
          roleUsers = Object.keys(activeUsers.getAllDrivers()); // Get all driver user IDs
        }
        socketIds = roleUsers.map((userId) => users[userId]); // Map to socket IDs
      } else {
        // If neither users nor role is provided, send to all
        socketIds = Object.values(users); // Get all socket IDs
      }

      sendInAppNotification(
        req.body.category,
        socketIds,
        req.body.title,
        req.body.description,
        req.body.image
      );

      if (target.length > 0) {
        await sendPushNotification(
          target,
          req.body.title,
          req.body.description,
          req.body.image,
          true
        );
      }
    }

    return sendSuccess(
      res,
      'Notification created successfully',
      newNotification
    );
  });

  //get a notification by notification id
  getOne = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const notification = await getNotificationById(id);
    if (!notification) return sendNotFound(res, 'Notification not found');
    return sendSuccess(res, 'Notification found successfully', notification);
  });

  //update a notification by notification id with payload in request body
  updateOne = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { ...data } = req.body;
    if (data.users) {
      const foundUsers = await getUsersByIds(req.body.users);
      if (foundUsers.length !== data.users.length)
        return sendNotFound(res, 'Some users not found');
    }
    const updatedNotification = await updateNotificationById(id, data);
    if (!updatedNotification)
      return sendNotFound(res, 'Notification not found');
    return sendSuccess(
      res,
      'Notification updated successfully',
      updatedNotification
    );
  });

  //soft-delete notification by notification id
  deleteOne = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const notification = await getNotificationById(id);
    if (!notification) return sendNotFound(res, 'Notification not found');
    const deletedNotification = await notification.deleteNotification();
    if (deletedNotification == false)
      return sendBadRequest(res, 'Failed to delete notification');
    return sendSuccess(res, 'Notification deleted successfully');
  });

  //get all notifications with pagination & sorting
  getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { limit = 5, page = 1, sort = 'asc' } = req.query;

    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const skip = (pageNumber - 1) * pageSize;
    const sortOrder = sort === 'desc' ? -1 : 1;

    const notifications = await getAllNotifications(pageSize, skip, sortOrder);
    if (notifications.length === 0)
      return sendNotFound(res, 'No notifications found');
    return sendSuccess(res, 'Notifications found', notifications);
  });

  //get notifications for users (D & P)
  getNotificationsByRole = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      console.log('Query: ', req.query);

      const { limit, page, role } = req.query;

      if (!role) return sendBadRequest(res, 'Role is required');
      if (role === 'D' && req.user?.role === 'P')
        return sendForbidden(
          res,
          'You are not authorized to access this resource'
        );

      const pageNumber = page ? Math.max(1, Number(page)) : undefined;
      const limitSize = limit ? Math.max(1, Number(limit)) : undefined;
      const skip =
        pageNumber && limitSize ? (pageNumber - 1) * limitSize : undefined;

      // Handle role 'A'
      if (role === 'A' && req.user?.role === 'A') {
        return sendSuccess(
          res,
          'Notifications fetched',
          await getAllNotifications(limitSize, skip)
        );
      }

      // Handle role 'P' (Passenger)
      if (role === 'P' && (req.user?.role === 'D' || req.user?.role === 'P')) {
        return sendSuccess(
          res,
          'Notifications fetched',
          await getPassengerNotifications(req.userId, limitSize, skip)
        );
      }

      // Handle role 'D' (Driver)
      if (role === 'D' && req.user?.role === 'D') {
        return sendSuccess(
          res,
          'Notifications fetched',
          await getDriverNotifications(req.userId, limitSize, skip)
        );
      }

      // If none of the conditions match, return a bad request response
      return sendBadRequest(res, 'Invalid request parameters');
    }
  );
}

export default NotificationController;
