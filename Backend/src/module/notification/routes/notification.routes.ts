import express from 'express';
const NotificationRouter = express.Router();

import { validateId } from '../../../validators/id.validator';
import { queryValidator } from '../../../validators/query.validator';
import NotificationController from '../controllers/notification.controller';
import { notificationValidator } from '../validations/notification.validator';
import { authorize, UserRoles } from './../../../middlewares/auth.middleware';

const controller = new NotificationController();

// for all users(A,D,P)
NotificationRouter.get('/', [queryValidator], controller.getNotificationsByRole);

//for admin only
NotificationRouter.get('/:id', [authorize([UserRoles.A]), validateId('id','NotificationId')], controller.getOne);
NotificationRouter.post('', [authorize([UserRoles.A]), notificationValidator], controller.createOne);
NotificationRouter.patch('/:id', [authorize([UserRoles.A]), validateId('id','NotificationId'),notificationValidator], controller.updateOne);
NotificationRouter.delete('/:id', [authorize([UserRoles.A]), validateId('id','NotificationId')], controller.deleteOne);

export default NotificationRouter;