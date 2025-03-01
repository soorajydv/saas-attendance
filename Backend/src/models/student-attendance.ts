import { Schema, model } from 'mongoose';
import { AttendanceStatus } from './enums';
import { IAttendance } from './interfaces/IAttendance.interface';

const studentAttendanceSchema: Schema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.toLocaleString(), // "October 10, 2023, 2:30:45 PM"
    },
    status: {
      type: String,
      enum: Object.values(AttendanceStatus),
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const StudentAttendance = model<IAttendance>(
  'StudentAttendance',
  studentAttendanceSchema
);

export default StudentAttendance;
