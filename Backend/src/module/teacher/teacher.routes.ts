import express from 'express';
import { authorize } from '../../middlewares/auth.middleware';
import { UserRole } from '../../models/enums';
import { teacherController } from './teacher.controller';

const teacherRouter = express.Router();

teacherRouter.get('/classes',[authorize(UserRole.TEACHER)],teacherController.getClassesByTeacherId);

export default teacherRouter;