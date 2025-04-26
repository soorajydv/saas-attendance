import express from 'express';
import NotificationRouter from './notification.routes';
import userNotificationRouter from './userNotification.routes';
const notificationRouter = express.Router();

notificationRouter.use('',userNotificationRouter);
notificationRouter.use('',NotificationRouter);

export default notificationRouter;