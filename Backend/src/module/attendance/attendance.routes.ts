import { authorize } from './../../middlewares/auth.middleware';
import express from 'express'
import { getPresentStudents, markAttendance } from './attendance.controller';
import { studentAttendanceValidator } from './attendance.validator';
import { UserRole } from '../../models/enums';

const attendanceRouter = express.Router();

attendanceRouter.post('',[authorize(UserRole.TEACHER),studentAttendanceValidator],markAttendance);
attendanceRouter.get('/present',[authorize(UserRole.TEACHER)],getPresentStudents);
attendanceRouter.get('/history',[authorize(UserRole.TEACHER)],getPresentStudents);

export default attendanceRouter;
