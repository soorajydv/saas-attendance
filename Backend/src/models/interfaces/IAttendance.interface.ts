import { AttendanceStatus } from '../enums';
import { SoftDeleteDocument } from 'mongoose-delete';

export interface IAttendance extends Document, SoftDeleteDocument {
  studentId?: string;
  date: Date;
  status: AttendanceStatus;
  subject: string;
  teacherId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
