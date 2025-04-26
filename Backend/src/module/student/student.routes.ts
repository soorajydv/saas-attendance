import express from 'express';
import { authorize } from '../../middlewares/auth.middleware';
import { UserRole } from '../../models/enums';
import studentController from './student.controller';
import { validateId } from '../../validators/id.validator';

const studentRouter = express.Router();

studentRouter.get('/classes/:id',[authorize(UserRole.TEACHER),validateId('id','ClassId')],studentController.getStudents);

export default studentRouter;