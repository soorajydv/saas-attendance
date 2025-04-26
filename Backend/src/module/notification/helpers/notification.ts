import { Response } from "express";
import { io } from "../../..";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { sendBadRequest } from "../../../utils/responseUtil";
import { getUsersByRole } from "../../auth/services/user.service";
import { NotificationEvents } from "../../socket/events";
import { getFCMTokensByUserIds, getNotificationForAllUsers, getNotificationsByRole, getNotificationsByUsers } from "../services/notification.service";
import { getUserNotificationByUserId } from "../services/userNotification.service";

// Helper function to get FCM tokens based on user role
export const getTargetByRoleOrUserIds = async (role?: string, usersIds?: string[]): Promise<string[]> => {
    let target: string[] = [];
    if (usersIds) {
        target = await getFCMTokensByUserIds(usersIds);
    } else if (role) {
        if (role === "P") {
            const passengers = await getUsersByRole(role)
            const passengerIds = passengers.map((user) => user._id.toString());
            console.log(passengerIds);
            target = await getFCMTokensByUserIds(passengerIds);
        } else if (role === "D") {
            const drivers = await getUsersByRole(role);
            const driverIds = drivers.map((user) => user._id.toString());
            console.log(drivers);
            target = await getFCMTokensByUserIds(driverIds);
        }
    }
    return target;
};

// Helper function to handle in-app notifications
export const sendInAppNotification = (category: string, socketIds: string[], title: string, description: string, image: string) => {
    if (category === "I") {
        const userSockets = socketIds; // Get all socket IDs
        for (let i = 0; i < userSockets.length; i++) {
            const socketId = userSockets[i];
            io.to(socketId).emit(NotificationEvents.NotificationInApp, {
                title,
                description,
                image,
                timestamp: new Date().toLocaleTimeString()
            });
        }
    }
};

export const getAllExistingNotificationsOfSelf = async (req: AuthRequest) => {
    // Step 1: Get notifications where the current user is in the `users` array
    const userNotification = await getNotificationsByUsers();
    const userNotifications = userNotification.filter((notification) => {
        if(notification.users?.some((user) => user.toString() === req.userId)) return notification._id;
        return false
    });
    const specificNotificationIds = userNotifications.map((notification)=>notification._id.toString())

    // Initialize variables for role-based and all-user notifications
    let notificationIdsByRole: string[] = [];
    let notificationIdsForAll: string[] = [];

    const role = req.query.role || req.user?.role
    if(req.query.role){
        console.log("Role applied in query:",role);
    } else { console.log("Authenticated user's role is applied")}

    // Step 3: Get notifications where role matches "D" or "P"
    const roleNotifications = await getNotificationsByRole(role as string);
    notificationIdsByRole = roleNotifications.map((notification) => notification._id.toString());
    // Step 4: Get notifications for all users
    const notificationsForAll = await getNotificationForAllUsers();
    notificationIdsForAll = notificationsForAll.map((notification) => notification._id.toString());
    console.log("fetch notificationsForAll",notificationIdsForAll);

    // Return all three arrays
    return { specificNotificationIds, notificationIdsByRole, notificationIdsForAll };
};

export const getAllSeenNotificationsOfSelf = async (req: AuthRequest, res: Response) => {
    const userNotifications = await getUserNotificationByUserId(req.userId);
    if (req.user?.role == 'P') return userNotifications?.seenPassengerNotification;
    if (req.user?.role == 'D') return userNotifications?.seenDriverNotification;
    return sendBadRequest(res, 'Notification exists of D/P only')
}

// Type definition for the push notification result (unchanged)
type PushNotificationResult =
    | { target: string; status: 'success'; response: string }
    | { target: string; status: 'error'; errorCode: string; errorMessage: string }
    | Array<
          | { token: string; status: 'success'; response: string }
          | { token: string; status: 'error'; errorCode: string; errorMessage: string }
      >;

// Return type for the function: error details or null
type PushNotificationErrorResult =
    | { notificationError: string } // Single token error
    | { notificationErrors: string } // Multi-token errors
    | null; // No errors

export const handlePushNotificationResult = (
    pushResult: PushNotificationResult,
): PushNotificationErrorResult => {
    if (Array.isArray(pushResult)) {
        // Multiple tokens case
        const hasErrors = pushResult.some((r) => r.status === 'error');
        if (hasErrors) {
            const errorMessages = pushResult
                .filter((r) => r.status === 'error')
                .map((r) => `Token ${r.token}: ${r.errorMessage}`)
                .join(', ');
            return { notificationErrors: errorMessages };
        }
        return null; // No errors
    } else {
        // Single token case
        if (pushResult.status === 'error') {
            return { notificationError: pushResult.errorMessage };
        }
        return null; // No errors
    }
};