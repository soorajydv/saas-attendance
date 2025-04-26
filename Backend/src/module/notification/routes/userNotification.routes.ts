import express from 'express';
import { authorize, UserRoles } from '../../../middlewares/auth.middleware';
import userNotificationController from '../controllers/userNotification.controller';
const userNotificationRouter = express.Router();

userNotificationRouter.get('/device', [authorize([UserRoles.D,UserRoles.P])], userNotificationController.getOne);
userNotificationRouter.post('/device', [authorize([UserRoles.D,UserRoles.P])], userNotificationController.createOne);
userNotificationRouter.patch('/device', [authorize([UserRoles.D,UserRoles.P])], userNotificationController.updateOne);
userNotificationRouter.get('/markAsRead', [authorize([UserRoles.D,UserRoles.P])], userNotificationController.markAllNotificationAsRead);
userNotificationRouter.get('/markAsRead/:id', [authorize([UserRoles.D,UserRoles.P])], userNotificationController.markOneNotificationAsRead);

export default userNotificationRouter;