import express from 'express'
import { markAttendance } from './attendance.controller';

const attendanceRouter = express.Router();

attendanceRouter.get('',markAttendance);

export default attendanceRouter;
