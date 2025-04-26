import express from 'express';
import authRouter from '../module/auth/auth.routes';
import suRouter from '../module/organization/organization.routes';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import adminRouter from './admin.routes';
import { UserRole } from '../models/enums';
// import qrRouter from '../module/qr/qr.routes';
import attendanceRouter from '../module/attendance/attendance.routes';
import studentRouter from '../module/student/student.routes';
import teacherRouter from '../module/teacher/teacher.routes';
import { getUploadSignature } from '../config/cloudinaryUpload';

const routes = express.Router();

routes.use('/auth', authRouter);
routes.use('/su',[authenticate,authorize(UserRole.SU)], suRouter);
routes.use('/admin',[authenticate,authorize(UserRole.TEACHER)],adminRouter);
routes.use('/teachers',[authenticate],teacherRouter);
// routes.use('/qr',[authenticate],qrRouter);
routes.use('/attendance',[authenticate],attendanceRouter);
routes.use('/students',[authenticate],studentRouter);
routes.get("/api/upload/signature", getUploadSignature);

export default routes;
