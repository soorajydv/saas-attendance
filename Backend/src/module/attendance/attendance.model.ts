import { Schema, model } from 'mongoose';
import { AttendanceStatus } from '../../models/enums';
import { IAttendance } from '../../models/interfaces/IAttendance.interface';

const studentAttendanceSchema: Schema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    period: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(AttendanceStatus),
      default: Object.values(AttendanceStatus.ABSENT),
    },
  },
  {
    timestamps: true,
  }
);

// Ensure uniqueness (same student, same date, same period)
studentAttendanceSchema.index({ studentId: 1, period: 1, date: 1 }, { unique: true });

const StudentAttendance = model<IAttendance>('StudentAttendance', studentAttendanceSchema);

export default StudentAttendance;
